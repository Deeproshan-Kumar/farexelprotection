# FAREXEL Protection — Premium Automotive Detailing Studio

FAREXEL Protection is a responsive automotive detailing studio website for presenting premium vehicle care services, paint protection film (PPF), ceramic coating, ISO certifications, customer experiences, and interactive booking estimation.

The project is built as a lightweight static website with semantic HTML5, custom CSS, ES modules, and browser-delivered third-party libraries. It does not require a bundler, framework, package manager, or build step.

## Features

- **Responsive Architecture**: Pixel-perfect design tailored for mobile, tablet, desktop, and ultra-wide displays.
- **Interactive Service Calculator (`services.html`)**: Select service cards to dynamically aggregate total price (AED), estimated turnaround time (Business Hours), vehicle category, and selected package badges with smooth scroll to booking form.
- **Industry Certificates (`certificates.html`)**: Showcase studio credentials including ISO 9001:2015, Master Detailer certifications, IDA memberships, Ceramic Coating & PPF Installer standards, and Nanotech surface protection.
- **GSAP ScrollTrigger Reveal Animations**: Scroll-based reveal animations across homepage counters, Client Experiences image & content blocks, home ratings, video galleries, photo grids, customer stories, team profiles, and service summaries.
- **Lenis Smooth Scroll**: Buttery smooth scrolling integrated with GSAP ScrollTrigger timeline management.
- **Theme Toggle**: Dark and light theme toggle with `localStorage` state persistence.
- **Full Section Accessibility (`aria-label`)**: 100% section-level ARIA accessibility pass across all 15 HTML pages.
- **Swiper Carousels**: Interactive carousels for promotional offers and client testimonials.
- **Responsive Navigation**: Mobile slide-out menu, interactive header top bar, and pillar transition overlay.
- **Ionicons Integration**: Vector iconography for actions, features, ratings, and vehicle categories.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Studio homepage, signature services, before/after, and client reviews |
| About | `about.html` | Studio story, craftsmanship process, and company details |
| Services | `services.html` | Interactive service catalog, duration calculator & booking form |
| Certificates | `certificates.html` | Verified studio credentials, certifications, and quality standards |
| Customer Experience | `customer-experience.html` | Client journey, detailed case studies, and before/after comparisons |
| Blog | `blog.html` | Detailing guides, paint maintenance articles, and news |
| Blog Detail | `blog-detail.html` | Full article view with reader recommendations |
| Career | `career.html` | Team career opportunities, benefits, and application submission |
| Job Detail | `job-detail.html` | Individual job role requirements and application form |
| Contact | `contact.html` | Location details, workshop map, direct inquiry, and working hours |
| Our Team | `our-team.html` | Detailer profiles, master technician credentials, and selection process |
| Testimonials | `testimonials.html` | Detailed client reviews and video testimonials |
| FAQs | `faqs.html` | Comprehensive answers regarding booking, PPF, and ceramic coating |
| Photos | `photos.html` | Filterable high-res gallery of completed detailing projects |
| Videos | `videos.html` | Video showcase of vehicle transformations and application processes |

## Technology Stack

### Core Frontend
- **HTML5**: Semantic markup with complete ARIA support (`aria-label`, `aria-hidden`, `role`).
- **CSS3**: Modern CSS custom properties, flexbox, grid, glassmorphism, and responsive breakpoints.
- **JavaScript (ES Modules)**: Native browser modules (`import`/`export`) without compilation overhead.

### Third-Party Libraries (via CDN)
- [Bootstrap 5.3.8](https://getbootstrap.com/)
- [Ionicons 8.0.13](https://ionic.io/ionicons)
- [Lenis 1.3.26](https://lenis.darkroom.engineering/) (Smooth Scroll)
- [GSAP 3.15.0](https://gsap.com/) & ScrollTrigger
- [Swiper 11](https://swiperjs.com/)

## Project Structure

```text
.
├── index.html
├── about.html
├── blog.html
├── blog-detail.html
├── career.html
├── certificates.html
├── contact.html
├── customer-experience.html
├── faqs.html
├── job-detail.html
├── our-team.html
├── photos.html
├── services.html
├── testimonials.html
├── videos.html
├── README.md
├── public/
│   ├── images/
│   │   └── certificates/
│   └── videos/
└── src/
    ├── css/
    │   ├── bootstrap-override.css
    │   ├── main.css
    │   └── responsive.css
    └── js/
        ├── heroIntro.js
        ├── init.js
        ├── main.js
        ├── pageTransition.js
        ├── scrollAnimations.js
        ├── servicesSummary.js
        └── toggleTheme.js
```

## Getting Started

### Quick Start (Local Server)

Since the project uses ES modules (`import`/`export`), it must be served via a local web server:

#### Option 1: Python 3
```bash
python -m http.server 4173
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

#### Option 2: Node.js / npx
```bash
npx serve .
```

#### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and choose **Open with Live Server**.

## Development Guidelines

- **Services Summary Logic**: Located in `src/js/servicesSummary.js`. Listens to card selections across all vehicle tabs and updates summary elements (`#summary-total-time`, `#summary-total-price`, `#summary-selected-services`, `#summary-vehicle-type`).
- **Animations**: GSAP ScrollTrigger reveals are managed in `src/js/scrollAnimations.js`.
- **Theme Manager**: Dark/light theme handler is configured in `src/js/toggleTheme.js`.
- **Accessibility**: Ensure any new `<section>` tag includes a descriptive `aria-label`.

## Deployment

FAREXEL Protection can be deployed directly to static hosting providers (GitHub Pages, Netlify, Vercel, Cloudflare Pages, AWS S3) by deploying the root folder. No build step or bundler is required.
