# FAREXEL Protection — Luxury Automotive & Motorcycle Detailing Studio

**FAREXEL Protection** is an elite, high-performance web platform built for a premier automotive and motorcycle protection studio. The platform presents comprehensive vehicle preservation solutions — including self-healing Paint Protection Film (PPF), multi-layer Nano Ceramic coatings, high-rejection solar window films, signature restorative detailing, and custom interior appointments.

Designed with an unapologetic dark luxury aesthetic, the site pairs precision craftsmanship with modern web technologies: semantic HTML5, modular CSS3 architecture, native ES6+ JavaScript modules, hardware-accelerated GSAP animations, and interactive client utility tools.

---

## Key Highlights & Features

### 1. Interactive Multi-Vehicle Service Matrix (`services.html` & `index.html`)
- **5 Vehicle Classifications**: Tailored service options and tiered pricing across **Sedan**, **Hatchback**, **SUV**, **Luxury Car**, and **Motorcycle / Bike**.
- **6 Structured Service Categories**:
  - **Paint Protection (PPF)**: Basic PPF, Front PPF, Complete Body Glossy, Complete Body Matte, Complete Body Colour, and Interior PPF.
  - **Window Tinting**: Basic, Premium, Advanced, Signature Heat Rejection, and Ultimate Visibility Windshield.
  - **Car Detailing**: Basic Detailing, Premium Detailing & Interior Care, and 7-Step Signature Finish.
  - **Nano Ceramic**: Nano Ceramic Basic, Premium, Premium Features, Interior Protection, and Complete Package.
  - **Signature Packages**: Signature Protection Package and Nano Ceramic Complete Suite.
  - **Motorcycle Services**: Express Wash, Premium Polishing Care, FAREXEL Premium Bike Care, and Brake Caliper Painting.
- **Standardized Currency**: All pricing formatted consistently in **SAR** (Saudi Riyal) across both catalog views.
- **Visual Excellence**: Every service card features high-resolution imagery served directly from `public/services/` with semantic `<h5>` card typography.

### 2. Service Summary with Regular vs. Additional Services Distinction (`servicesSummary.js`)
- Click-to-select interactive service cards with real-time feedback across regular and additional bespoke sections.
- **Visual Differentiation**:
  - **Regular Services**: Displayed with crimson-accented badges and checkmark icons.
  - **Additional & Bespoke Services**: Distinguished with luxury amber/gold badges (`#f59e0b`), sparkle icons, and a dedicated section divider.
- Dynamic aggregation of total cost (**SAR**), active vehicle category, and flexible installment payment integration (**Tabby & Tamara**).
- Instant synchronization with the on-page booking form with smooth scroll anchoring.

### 3. Customer Experience — 12 Google-Verified Reviews (`customer-experience.html`)
- **12 Authentic Reviews**: Sourced from verified Google client feedback for Farexel Protection in Al Khobar, Saudi Arabia.
- **Uniform Content Length**: Balanced, editorial-grade review lengths ensuring clean alignment across the 3-column responsive Swiper carousel.
- **5-Star Verification Badge**: Header and cards prominently display verified Google Client badges and 5.0 star ratings.
- **Interactive Before-and-After Sliders**: Drag-and-slide dual-layer image comparison sliders with touch and keyboard accessibility.

### 4. Cinema Studio & Viral Reels Hybrid (`videos.html`)
- **Premiere Spotlight Player**: 4K featured widescreen theater frame with ambient red backlight glow, play/pause, sound toggle (Mute / Unmute), and GLightbox fullscreen trigger.
- **Viral Detailing Reels & Shorts (9:16 Vertical Carousel)**: Dedicated Instagram/TikTok-style smartphone reel swiper with view counts (`🔥 385K Views`), animated audio indicators, hover preview playback, and full-screen reel lightbox modals.
- **16:9 Cinema Productions Grid**: Multi-category filterable documentary grid (*PPF Craft*, *Ceramic Shield*, *Superbike Preservation*, *Client Stories*) with video duration tags, vehicle model badges, and artisan descriptions.
- **High-Converting Lead-Gen Bar**: Integrated booking calls to action connecting video viewing directly to WhatsApp inquiries and studio appointment booking.

### 5. Architectural Fixes & Filter Resilience (`init.js`)
- **Grid Container Detection**: Updated to dynamically identify `.masonary-grid`, `.cinema-grid`, and `.row.gy-4` containers.
- **Dual-Control Synchronization**: Real-time two-way synchronization between interactive category pills and the sort dropdown.
- **Accurate Count Logging**: Automatically calculates and displays live result counts upon initial page load and on every filter change.

### 6. Luxury Subpage Banner with Precision Technical Grid Lines
- **Aesthetic**: Deep multi-tone dark-carbon background (`#0b0b10` to `#121218`) with ambient red radial spotlight and technical precision geometric grid lines (`48px` primary grid with `240px` major accent lines).
- **Typography & Breadcrumbs**: Syne headline with signature crimson accent underline and frosted glassmorphic pill breadcrumb containers.

### 7. Modernized Privacy Policy & Terms of Service UI
- **Fixed / Sticky TOC Sidebar**: Left-hand navigation (`.policy-toc-nav`) stays smoothly fixed in place while the right-side content scrolls independently.
- **Automated Scrollspy (`initPolicyScrollSpy`)**: Automatically detects the active section during scroll via `IntersectionObserver` and highlights the current TOC item with smooth auto-scrolling inside the navigation list.
- **Independent Scroll Container**: The TOC sidebar features a custom crimson scrollbar, preventing overflow on small vertical viewports.
- **Numbered Section Badges**: Distinct `SECTION 01` through `SECTION 20` pill markers and cardified content blocks with subtle borders.
- **Typography Preservation**: Strictly preserves client-approved font families, sizes, and hierarchical formatting.

### 8. Bidirectional "Explore / Close Coverage" Collapse Controls
- **Comprehensive Coverage Toggles**: Every service package card across all vehicle categories on `index.html` (177 packages) and `services.html` (177 packages) includes a direct "Close Coverage" button inside the feature panel.
- **Exclusive Privileges (Offers)**: All promotional cards on the homepage (`#features-list-178` to `#features-list-180`) now feature matching "Close Coverage" controls to smoothly collapse coverage lists back into card view.
- **Click Isolation**: All collapse toggle events are isolated from card selection logic so reviewing coverage details never unintentionally alters selected service estimates.

---

## Site Pages Directory

| Page | File | Description |
| --- | --- | --- |
| **Home** | `index.html` | Studio overview, hero showcase, featured service matrix, highlights, and client stories |
| **About Us** | `about.html` | Studio heritage, master technician standards, and detailing philosophy |
| **Services & Estimator** | `services.html` | Complete multi-vehicle service catalog, interactive quote calculator, and booking inquiry |
| **Customer Experience** | `customer-experience.html` | Client journey, transformation case studies, and interactive Before/After comparison gallery |
| **Certificates & Standards** | `certificates.html` | Studio credentials, ISO 9001:2015 certifications, and certified installer badges |
| **Our Team** | `our-team.html` | Master detailer profiles, specialist credentials, and artisan biographies |
| **Leadership Insights** | `leadership-insights.html` | Executive perspectives on automotive preservation and detailing innovation |
| **Photos Gallery** | `photos.html` | High-resolution portfolio of completed client vehicles and studio work |
| **Videos Showcase** | `videos.html` | Cinematic transformation videos and workshop process reels |
| **Testimonials** | `testimonials.html` | Verified customer reviews, video feedback, and client ratings |
| **FAQs** | `faqs.html` | Comprehensive answers regarding PPF warranties, ceramic care, and booking policies |
| **Blog & News** | `blog.html` | Detailing guides, paint maintenance articles, and studio updates |
| **Blog Detail** | `blog-detail.html` | In-depth automotive care guide view with related article recommendations |
| **Careers** | `career.html` | Studio culture, open artisan positions, technician perks, and application intake |
| **Job Detail** | `job-detail.html` | Role specifications, candidate requirements, and direct resume upload form |
| **Contact Us** | `contact.html` | Workshop address, interactive map, direct inquiry form, and studio hours |
| **Privacy Policy** | `privacy-policy.html` | Data governance, client privacy commitments, and cookie disclosures |
| **Terms of Service** | `terms-of-service.html` | Workshop service warranties, booking terms, and customer guidelines |

---

## Technology Stack

- **Markup**: Semantic HTML5 with complete ARIA role coverage
- **Styling**: Vanilla CSS3 Custom Properties (Design Tokens), Flexbox, CSS Grid
- **Framework & Components**: [Bootstrap 5.3.8](https://getbootstrap.com/) (Grid and Utilities)
- **Icons**: [Ionicons 8.0.13](https://ionic.io/ionicons)
- **Animations**: [GSAP 3.15.0](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis 1.3.26](https://lenis.darkroom.engineering/)
- **Carousels**: [Swiper 11](https://swiperjs.com/)
- **Architecture**: Native ES6+ Modules (`type="module"`) — zero build tools or bundlers required

---

## Project Structure

```text
farexel-protection/
├── index.html                      # Homepage
├── about.html                      # Studio About Page
├── blog.html                       # Blog Catalog
├── blog-detail.html                # Single Blog Post
├── career.html                     # Careers & Opportunities
├── certificates.html               # Quality & ISO Certifications
├── contact.html                    # Contact & Workshop Map
├── customer-experience.html        # Case Studies & Before/After Sliders
├── faqs.html                       # Frequently Asked Questions
├── job-detail.html                 # Job Description & Application
├── leadership-insights.html        # Executive & Industry Insights
├── our-team.html                   # Artisan & Technician Team
├── photos.html                     # High-Resolution Photo Gallery
├── privacy-policy.html             # Privacy Policy
├── services.html                   # Interactive Service Matrix & Booking
├── terms-of-service.html           # Terms of Service
├── testimonials.html               # Customer Reviews & Video Feedback
├── videos.html                     # Detailing Reel Showcase
├── .gitignore                      # Git Ignore Rules
├── README.md                       # Platform Documentation
├── public/
│   ├── favicons/                   # Browser Favicons & App Icons
│   ├── images/
│   │   ├── before-after/           # Before & After Slider Image Assets
│   │   ├── certificates/           # Certification Badges & Documents
│   │   └── ...                     # Studio & Team Photography
│   ├── services/                   # 24 Dedicated Real Service Cards Images
│   └── videos/                     # Detailing & Workshop Video Footage
└── src/
    ├── css/
    │   ├── bootstrap-override.css  # Component Style Resets & Overrides
    │   ├── main.css                # Core Design Tokens, Layout & Utilities
    │   └── responsive.css          # Viewport-Specific Responsive Rules
    └── js/
        ├── beforeAfterSlider.js    # Before/After Image Slider & Multi-Category Filter
        ├── heroIntro.js            # Hero Entrance GSAP Timelines
        ├── init.js                 # Widget Initializers (Swipers, Lightbox, Counters)
        ├── main.js                 # Application Entry Point & Lifecycle Orchestration
        ├── pageTransition.js       # Smooth Page Intro/Outro Transitions
        ├── scrollAnimations.js     # GSAP ScrollTrigger Animations & Tab Visibility
        ├── servicesSummary.js      # Dynamic Service Selection & SAR Quote Aggregator
        └── toggleTheme.js          # Dark / Light Theme Manager with LocalStorage
```

---

## Local Development & Setup

Because the platform uses native browser ES modules (`import` / `export`), pages must be served via an HTTP server rather than opened as raw file URLs (`file:///`).

### Running Locally

Choose any of the following lightweight servers:

#### Option 1: Python 3 (Built-in)
```bash
python -m http.server 8080
```
Then navigate to [http://localhost:8080](http://localhost:8080).

#### Option 2: Node.js / npx
```bash
npx serve .
```

#### Option 3: VS Code Live Server Extension
Right-click on `index.html` or `services.html` and select **"Open with Live Server"**.

---

## Production Deployment

FAREXEL Protection is 100% static and requires no compilation step. The repository can be deployed directly to modern static hosting solutions:

- **Cloudflare Pages**
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

Ensure that server response headers include proper caching for static assets (`public/`) and `text/html` headers for clean routing.

---

## Developer

- **Deeproshan Kumar**