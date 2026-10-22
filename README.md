# Astro Minimal Starter

## Working prototype outreach

Use the [prototype delivery process and email templates](docs/working-prototype-outreach.md)
for the Free Working Prototype, delivered within 72 hours of reaching out.
Accept an existing website or a quick business summary; a phone number or sales call is never required.

## Google Analytics 4

Tracking is configured for measurement ID `G-V28M1Q2K76` on
`https://devotioncreative.com`. Collection starts after deployment through
CloudCannon. If its build environment already defines `SITE_URL`, ensure it is
`https://devotioncreative.com`; this overrides the default in `astro.config.mjs`.

1. Create a Google Analytics property named **Devotion Creative** and a **Web**
   data stream for the live website. Copy its `G-…` measurement ID.
2. Set `google_analytics_id` in `data/site.json`, or set
   `PUBLIC_GA_MEASUREMENT_ID` in the hosting build environment to override it.
   This is a public identifier, not a secret. Do not paste a full script or a `GTM-` ID.
3. Set `SITE_URL` to the live website origin. Build and deploy with `npm run build`.
   Analytics runs only in production builds on that exact origin, outside iframes;
   development, alternate preview origins, and the CMS Visual Editor are excluded.
4. In the web stream's **Enhanced measurement** settings, keep page views, scrolls,
   outbound clicks, and downloads enabled. Turn **Form interactions** off: this
   site measures the two forms itself, including their actual server responses.
5. Mark **generate_lead** as a key event in Analytics. This is the primary
   conversion. `phone_added` is an optional follow-up, not a second lead.
6. Check **Realtime** while browsing the deployed website. Use Google Tag
   Assistant and **DebugView** to inspect event parameters. Browser blockers can
   prevent collection. Test form submissions on the live site create real inquiries.

| Event | Meaning |
| --- | --- |
| `page_view` | One automatic view per page load, including About and the case study |
| `cta_click` | Prototype buttons, with their location and destination |
| `navigation_click` | Other internal/external navigation links |
| `project_click` | Energy Transport or Excel SPT preview/text links |
| `contact_click` | Email or telephone link clicks, without the contact address/number |
| `section_view` | A section heading becomes at least half visible, once per page |
| `scroll_depth` | 25%, 50%, 75%, 90%, and 100% of scrollable distance, once each |
| `lead_form_start` | First input in each form, once per page |
| `lead_form_submit` | A validated, security-checked submission attempt |
| `lead_form_error` | Website/summary validation, security check, or request failure |
| `generate_lead` | Server accepted a prototype request |
| `phone_added` | Server accepted the optional phone follow-up |

The success URL (`?review=sent`) and reloading the confirmation do not emit
conversions. The existing form endpoint's successful HTTP response is the
confirmation boundary; this does not verify eventual email delivery.

Custom events never read or send names, emails, phone numbers, website inputs,
free-text answers, CAPTCHA tokens, or session-stored contact details. Custom link
URLs exclude query strings and unknown fragments. Page URLs retain only campaign
parameters (`utm_*` fields listed in the implementation, `gclid`, and `dclid`);
referrers exclude query strings and fragments. Keep personal information out of
campaign values. Google Signals and ad personalization are disabled.

For breakdowns in reports, add event-scoped custom dimensions for `link_location`,
`project_name`, `section_name`, `form_name`, `error_type`, and `contact_method` in
**Admin → Custom definitions**. `scroll_depth` is separate from Google's built-in
90% `scroll`; use one event when reporting scroll totals. Likewise, Google's
outbound `click` and our project/navigation events describe different aspects of
one interaction and should not be added together as a click total.

Implementation: `src/components/GoogleAnalytics.astro` and
`src/scripts/analytics.ts`; form outcome hooks are in `src/pages/index.astro`.
No consent manager is currently installed; any future consent controls should gate
initialization here before the Google script loads.

References: [Google Analytics setup](https://support.google.com/analytics/answer/9304153),
[page views](https://developers.google.com/analytics/devguides/collection/ga4/views),
and [event parameters and custom dimensions](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

## Devotion Creative SEO

- Set `SITE_URL` in the hosting **build environment** to the preferred public origin
  (including `https://`) and rebuild before launching on a custom domain. It currently
  defaults to `https://devotioncreative.com`. Use the same origin
  for canonicals, the sitemap, and structured data; redirect alternate domains to it.
- The live custom domain is hosted on CloudCannon. The separate Sites preview
  configuration does not publish changes to this domain.
- Shared metadata is in `src/layouts/Layout.astro`; default description and optional
  social image settings are in `data/site.json`. The default sharing image is
  `public/og.png`, a 1200 × 630 Devotion Creative logo card with a charcoal and orange
  gradient. The shared layout uses it for Open Graph and Twitter/X previews, with
  an absolute URL based on `SITE_URL`. Pages can override it with `featured_image`.
  Give each new page a distinct title
  and description. The homepage title and description are editable in
  `data/homepage.json`.
- The homepage includes Organization, WebSite, and service catalog JSON-LD derived
  from the displayed business information. Add real contact details or testimonials
  when available; do not add invented addresses, ratings, or service areas.
- `@astrojs/sitemap` generates `/sitemap-index.xml` and `/sitemap-0.xml` during
  `npm run build`; `/robots.txt` points crawlers to the sitemap. The 404 page is
  excluded and marked `noindex`. Exclude any future noindex pages in the sitemap
  integration's `filter` as well.
- After public deployment, verify the preferred domain in Google Search Console,
  submit `/sitemap-index.xml`, and inspect the homepage URL. Confirm that missing
  URLs return an HTTP 404 on the production host.

References: [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
[Google organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization),
and [Astro sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

A minimal starter template for building an Astro site with [CloudCannon](https://cloudcannon.com/) using **Editable Regions** for visual editing.

See a [demo site](https://tiny-jackal.cloudvent.net/).

## Features

- Visual editing with [Editable Regions](https://cloudcannon.com/documentation/developer-guides/set-up-visual-editing/an-overview-of-editable-regions/) (text, image, array, source, and component regions)
- Page building with reusable components
- Blog with pagination and tags
- [Tailwind CSS v4](https://tailwindcss.com/) with CSS-first configuration
- SEO controls
- Pagefind search

## Getting Started

Click `Use this template` to make your own copy of the repository.

### Local Development

1. Clone the repository to your local machine.

2. Start the development server.

```bash
npm install
npm run dev
```

## CloudCannon Setup

This site is pre-configured for CloudCannon. Connect your repository and CloudCannon will detect the configuration in `.cloudcannon/initial-site-settings.json` and build your site automatically. The editing experience is defined in `cloudcannon.config.yml`, which you can modify to control your editors' experience.

### Editing the Devotion Creative homepage

Open **Pages → Devotion Creative** in CloudCannon. The Visual Editor connects individual text and image regions to `data/homepage.json`. The Data Editor and the Visual Editor sidebar expose the same content, grouped by section, including navigation links, repeated services and process steps, image descriptions, and form labels. Save after changing links or adding/reordering items so CloudCannon rebuilds the preview.

The homepage has four main sections: a short introduction, three services, selected work, and the prototype form with a concise process. Energy Transport and Excel Sports Performance Therapy appear side by side on desktop and stack on mobile. The hero heading has separate beginning, highlighted, and optional ending fields to retain its orange emphasis. Energy Transport images are shared between the homepage preview and its case study. Header and footer content is shared across routes. Hidden form confirmation messages can be changed in the Prototype form and confirmation fields.

The testimonial appears once both a real quote and client name are filled in. Blank footer contact fields are omitted; fill these through the Data Editor or sidebar to display them. Use homepage paths such as `/#prototype` for shared navigation so links also work from the 404 page.

Content is plain text, escaped by Astro. Layout, styling, section IDs, form endpoints, reCAPTCHA, and interaction code remain in the templates. Do not wrap the homepage in a Source Editable Region: its forms and template loops cannot safely be edited as rich text. Homepage input configuration lives in `.cloudcannon/homepage.cloudcannon.inputs.yml`.

These changes take effect in CloudCannon after this branch is merged into the branch connected to the site and its build finishes. Open the homepage again from Pages; an old editor tab may still point to `src/pages/index.astro`.

### Energy Transport case study

Energy Transport project links open `/work/energy-transport/`. The page explains the visible design decisions and reuses the homepage’s combined desktop-browser and overlapping-phone presentation as a static hero. Both pages share `src/components/energy-transport-preview.astro`, a wrapper around the reusable `src/components/project-preview.astro`. The desktop image is cropped to its hero section, ending before the stats band; update `desktopCropHeight` in the wrapper if a replacement screenshot has different hero dimensions. The mobile preview uses the iPhone 17 portrait display ratio (1206:2622) and crops the image from the top to one screen. Neither preview has device switches, scrollable image areas, or full-image links.

Excel Sports Performance Therapy uses the same preview component and links to `https://excelspt.com/` in a new tab. Edit its description, link, and screenshot fields under `work.excel` in `data/homepage.json`. Its locally stored images capture the live desktop hero and mobile opening screen; update the image dimensions when replacing them. The new project does not add a separate case-study page.

Open **Energy Transport** in CloudCannon to edit the case study's copy and metadata in `data/energy-transport.json`. Screenshot assets remain shared with `data/homepage.json`. The copy describes the design, without claiming measured lead growth or an unverified client brief. Add project history, client feedback, or results only when confirmed.

### About page

The About navigation item and the homepage's Meet John link open `/about/`.
Edit `data/about.json` through **About** in CloudCannon. The page currently uses
John Choi's supplied professional background, personal interests, and confirmed
service information. Upload John's portrait through `portrait.image`; the
photo is hidden until supplied. Background paragraphs remain editable in
`background`. No stock portrait is used.
Keep its prototype turnaround and optional-management copy consistent with the
homepage when the offer changes.

### Editable Regions

This starter demonstrates several types of Editable Region:

- **Text** (`data-editable="text"`) for editing front matter text values inline
- **Image** (`data-editable="image"`) for editing front matter image values
- **Array** (`data-editable="array"`) for page-building with reorderable content blocks
- **Source** (`data-editable="source"`) for making standalone `.astro` pages editable
- **Component** (`<editable-component>`) for live re-rendering of Astro components

Components that need live re-rendering are registered in `src/scripts/register-components.ts` and loaded conditionally when the site is open in CloudCannon's Visual Editor.

#### Source Editables

The About page (`src/content/pages/about.astro`) demonstrates **source editables** — a pattern where content lives directly in an Astro template rather than in Markdown front matter. Source editable regions use `data-editable="source"`, `data-path="path/to/file.astro"`, and `data-key` attributes. CloudCannon writes changes straight back to the `.astro` file.

This is useful for standalone pages (like About or Contact) where a developer wants full control over the markup while still giving editors visual editing access — **and where page building with components is *not* desired**. No accompanying Markdown file or front matter schema is needed. A thin routing wrapper in `src/pages/about.astro` handles Astro's file-based routing.

### Components

Three page-building components are included:

- **Hero** — heading, subheading, image, and optional button
- **LeftRight** — side-by-side text and image, with optional flip and button
- **TextBlock** — heading and rich text content

### Content

- **Homepage content** is in `data/homepage.json`; `src/pages/index.astro` renders the existing design. The CloudCannon Pages collection opens this content file at `/`.
- **Blog posts** are in `src/content/blog/` as MDX files
- **Data** files (site settings, navigation) are in `data/`

## Project Structure

```
├── .cloudcannon/          # CloudCannon schemas and postbuild
├── cloudcannon.config.yml # CloudCannon configuration
├── data/                  # Site-wide data files
├── public/                # Static assets
└── src/
    ├── components/        # Astro components
    ├── content/           # Content collections (pages, blog)
    ├── layouts/           # Page layouts
    ├── pages/             # Astro page routes
    ├── scripts/           # Component registration for visual editing
    └── styles/            # Global CSS (Tailwind v4)
```
