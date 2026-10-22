type EventParameters = Record<string, string | number | boolean>;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  devotionAnalyticsReady?: boolean;
};

const analyticsWindow = () => window as AnalyticsWindow;

export function trackEvent(name: string, parameters: EventParameters = {}) {
  const analytics = analyticsWindow();
  if (!analytics.devotionAnalyticsReady) return;
  // Tracking must never prevent a form submission or navigation.
  try {
    analytics.gtag?.("event", name, { ...parameters, transport_type: "beacon" });
  } catch {
    // Analytics can be blocked by browser extensions.
  }
}

type LeadForm = "prototype_request" | "phone_followup";
export function trackFormEvent(
  name: "lead_form_start" | "lead_form_submit" | "generate_lead" | "phone_added" | "lead_form_error",
  form: LeadForm,
  reason?: "validation" | "security_check" | "submission_failed",
) {
  trackEvent(name, { form_name: form, ...(reason ? { error_type: reason } : {}) });
}

// Never include arbitrary query strings, fragments, or URL credentials in custom events.
function cleanUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return ["http:", "https:"].includes(url.protocol) ? `${url.origin}${url.pathname}` : "";
  } catch {
    return "";
  }
}

export function initializeAnalytics() {
  const config = document.querySelector<HTMLMetaElement>('meta[name="google-analytics"]');
  const analytics = analyticsWindow();
  if (!config || analytics.devotionAnalyticsReady) return;
  // Production builds are also used in local previews and the CMS Visual Editor.
  if (window.location.origin !== config.dataset.siteOrigin || window.self !== window.top) return;

  analytics.dataLayer = analytics.dataLayer || [];
  analytics.gtag = function () { analytics.dataLayer!.push(arguments); };
  analytics.gtag("js", new Date());

  const pageUrl = new URL(window.location.href);
  const campaignParameters = new URLSearchParams();
  for (const name of ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content", "gclid", "dclid"]) {
    const value = pageUrl.searchParams.get(name);
    if (value) campaignParameters.set(name, value);
  }
  const query = campaignParameters.toString();
  analytics.gtag("config", config.content, {
    // The config command sends the single page_view for this full-page Astro site.
    page_location: `${cleanUrl(pageUrl.href)}${query ? `?${query}` : ""}`,
    page_referrer: cleanUrl(document.referrer || "") || "",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  analytics.devotionAnalyticsReady = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.content)}`;
  document.head.append(script);

  document.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const location = link.closest("header.site-header") ? "header"
      : link.closest("footer") ? "footer"
      : link.closest<HTMLElement>("[data-analytics-section]")?.dataset.analyticsSection || "content";

    if (/^(mailto:|tel:)/i.test(href)) {
      trackEvent("contact_click", { contact_method: href.toLowerCase().startsWith("mailto:") ? "email" : "phone", link_location: location });
      return;
    }
    const destination = cleanUrl(link.href);
    if (!destination) return;
    const url = new URL(link.href);
    // Only known on-page anchors are recorded; never take text from visitor content.
    const section = ["#top", "#services", "#work", "#prototype", "#process"].includes(url.hash) ? url.hash : "";
    const eventName = link.dataset.analyticsProject ? "project_click"
      : link.matches(".button, .nav-cta") ? "cta_click" : "navigation_click";
    trackEvent(eventName, {
      link_url: `${destination}${section}`,
      link_location: location,
      outbound: url.origin !== window.location.origin,
      ...(link.dataset.analyticsProject ? { project_name: link.dataset.analyticsProject } : {}),
    });
  });

  for (const [selector, name] of [
    ["[data-review-request-form]", "prototype_request"],
    ["[data-phone-form]", "phone_followup"],
  ] as const) {
    const form = document.querySelector<HTMLFormElement>(selector);
    // One start per form per page, even if the visitor switches fields.
    form?.addEventListener("input", () => trackFormEvent("lead_form_start", name), { once: true });
  }

  const reached = new Set<number>();
  let scheduled = false;
  const measureScroll = () => {
    scheduled = false;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height <= 0) return;
    const percent = Math.min(100, Math.round(window.scrollY / height * 100));
    for (const milestone of [25, 50, 75, 90, 100]) {
      if (percent >= milestone && !reached.has(milestone)) {
        reached.add(milestone);
        trackEvent("scroll_depth", { percent_scrolled: milestone });
      }
    }
  };
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(measureScroll);
    }
  }, { passive: true });
  measureScroll();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
        const section = entry.target.closest<HTMLElement>("[data-analytics-section]");
        if (section?.dataset.analyticsSection) {
          trackEvent("section_view", { section_name: section.dataset.analyticsSection });
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });
    document.querySelectorAll("main [data-analytics-section]").forEach((section) => {
      observer.observe(section.querySelector("h1, h2") || section);
    });
  }
}
