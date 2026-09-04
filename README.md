# Astro Minimal Starter

## Devotion Creative SEO

- Set `SITE_URL` in the hosting **build environment** to the preferred public origin
  (including `https://`) and rebuild before launching on a custom domain. It currently
  defaults to `https://devotion-creative.choi7sx.chatgpt.site`. Use the same origin
  for canonicals, the sitemap, and structured data; redirect alternate domains to it.
- The connected Sites preview is currently private. Search engines need a public
  deployment to crawl the site. These changes do not change hosting access.
- Shared metadata is in `src/layouts/Layout.astro`; default description and optional
  social image settings are in `data/site.json`. Give each new page a distinct title
  and description. The homepage title and description are editable in
  `data/homepage.json`. Social title and description tags work without an image.
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

The hero heading has separate beginning, highlighted, and ending fields to retain its orange emphasis. Project images are shared between thumbnails, previews, and the full design viewer. Header and footer content is shared across routes. Hidden form confirmation messages can be changed in the Review form and confirmation fields.

The testimonial appears once both a real quote and client name are filled in. Blank footer contact fields are omitted; fill these through the Data Editor or sidebar to display them. Use homepage paths such as `/#review` for shared navigation so links also work from the 404 page.

Content is plain text, escaped by Astro. Layout, styling, section IDs, form endpoints, reCAPTCHA, and interaction code remain in the templates. Do not wrap the homepage in a Source Editable Region: its forms, dialogs, and template loops cannot safely be edited as rich text. Homepage input configuration lives in `.cloudcannon/homepage.cloudcannon.inputs.yml`.

These changes take effect in CloudCannon after this branch is merged into the branch connected to the site and its build finishes. Open the homepage again from Pages; an old editor tab may still point to `src/pages/index.astro`.

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
