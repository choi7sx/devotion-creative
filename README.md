# Astro Minimal Starter

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
