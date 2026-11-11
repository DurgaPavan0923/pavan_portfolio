# Comprehensive Baseline Audit (v4.0) — UX, Mobile & Credibility Pass

**Date:** November 11, 2026  
**Auditor:** Senior UI/UX Designer, Frontend Architect, Performance Engineer, and QA Lead  
**Branch:** `feat/final-ux-polish`  
**Reference Live URL:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)  
**Baseline Screenshots Captured:** `/docs/screenshots/before/` (`dark-360px`, `dark-390px`, `dark-430px`, `dark-768px`, `dark-1440px`, `light-360px`, `light-390px`, `light-430px`, `light-768px`, `light-1440px`)

---

## 1. Executive Summary & Audit Scope

A forensic examination of the live production deployment and the repository codebase was conducted across viewports (360px, 390px, 430px, 768px, 1440px) in both Dark and Light modes. While earlier passes successfully eliminated ungrounded buzzwords, calibrated empirical ML metrics, and standardized the 9-section recruiter sequence, substantial UX and design debt remains:

1. **Mobile Ergonomics (≤ 768px):** A floating bottom navigation bar (`MobileDock.tsx`) clashes with mobile OS gesture bars, covers bottom content, and duplicates the hamburger drawer. The hero section occupies too much vertical padding, pushing CTAs below the initial viewport.
2. **Header Alignment:** Logo, theme switcher, and hamburger icon lack unified height and baseline alignment at small widths (320px–430px).
3. **Chatbot Floating Action Button:** Positioned in a way that risks obscuring the contact form submit button and input fields on mobile.
4. **Image Modal / Lightbox:** Lacks strict mobile viewport constraints (85–90% width, ≤ 75–80vh height) and desktop constraints (max-width 700–850px, max-height 75vh); close button is small and tap-outside handling is incomplete.
5. **Moments Photo Gallery:** Contains duplicate events and repeated images across the 16 entries; infinite marquee track requires clean `aria-hidden="true"` duplication and de-duplicated item source.
6. **Academic Metric (CGPA & Result Portal):** The prompt explicitly orders complete removal of CGPA (`7.85 / 10.0`) and the accompanying SOA Result Portal link across all data, UI, metadata, ⌘K, chatbot prompts, types, and documentation.
7. **Light & Dark Theme Separation:** Light theme currently operates primarily as an inversion rather than a distinct, intentional design identity (needs pure white cards, soft off-white canvas, natural shadows without glow, refined blue/teal accent, and WCAG AA contrast compliance).
8. **Credentials Verification:** The phrase "Available on request" needs replacement: direct verification links where a valid URL exists, credential ID if available, or removal of the verify button with documentation in `OPEN_ITEMS.md`.
9. **Project Evaluation Disclosure:** Extensive methodology explanations on project cards need to be housed inside an accessible, collapsed-by-default expandable disclosure (`<details>` / "Evaluation details").

---

## 2. Forensic Findings by Section & Priority

### P0-A: Mobile Navigation & Layout (≤ 768px)
- **Finding A1 (Fixed Bottom Dock):** `src/components/layout/MobileDock.tsx` renders a persistent pill toolbar fixed at `bottom-4`. On modern mobile browsers (Safari iOS, Chrome Android), this toolbar overlaps with native home indicator bars and covers interactive content in the footer and contact sections.
  - *Remedy:* Completely remove `MobileDock.tsx` from the mobile layout. Consolidate all mobile navigation into `MobileMenu.tsx` (the hamburger drawer). Add a trigger for the ⌘K command palette inside the mobile menu drawer.
- **Finding A2 (Safe Bottom Padding):** Lack of `env(safe-area-inset-bottom)` in main layout causes interactive elements to sit uncomfortably close to device edges on modern edge-to-edge smartphones.
  - *Remedy:* Enforce `pb-safe` on main containers and modals.
- **Finding A3 (Hero Vertical Rhythm):** `src/components/sections/Hero.tsx` uses `pt-28 pb-16` on mobile. The profile photo avatar and large margins force the value statement and 3 action CTAs below the fold on 360–390px screens.
  - *Remedy:* Tighten vertical padding on mobile (`pt-20 sm:pt-28 pb-8 sm:pb-16`), scale avatar to fit comfortably, and adjust margins so name, value statement, and CTAs appear in the first viewport.
- **Finding A4 (Header Alignment):** In `Navbar.tsx`, the logo, theme switch button, and hamburger button have differing heights and padding, causing slight vertical misalignment at 320–430px.
  - *Remedy:* Unify heights (`h-10 w-10`), flex centering, and baseline alignment.
- **Finding A5 (Tap Targets & Overflow):** Several buttons measure under the WCAG 44px minimum touch target requirement on mobile.
  - *Remedy:* Enforce `min-h-[44px] min-w-[44px]` on all interactive elements; verify `scrollWidth <= innerWidth` across all breakpoints.
- **Finding A6 (Background Particle Density):** `NeuralBackground.tsx` spawns 60 animated particles regardless of device capabilities, consuming battery and GPU cycles on mobile.
  - *Remedy:* Detect mobile viewport and reduce particle count to 20; lower opacity; disable entirely on `prefers-reduced-motion` or low-power mode.
- **Finding A7 (Chatbot Placement & Form Collision):** The floating chatbot button remains visible over inputs when users focus on the contact form on mobile screens.
  - *Remedy:* Position chatbot button at `bottom-4 right-4` with safe-area padding; attach input focus listeners to temporarily hide or offset the button when any form field is focused.

---

### P0-B: Image Modal & Photo Gallery
- **Finding B1 (Lightbox Dimensions):** `GalleryModal.tsx` lacks viewport-clamped sizing. On mobile, images can stretch or overflow; on desktop, images lack a strict 700–850px max width and 75vh max height clamp.
  - *Remedy:* Rebuild modal with `max-w-[850px] max-h-[75vh]` on desktop and `w-[90vw] max-h-[75vh]` on mobile, with `object-fit: contain`. Add visible 44px close button in safe area, touch swipe gestures, and outside-tap close.
- **Finding B2 (Duplicate Moments & Events):** `src/data/gallery.ts` contains 16 items with duplicate events (e.g., two NCC CATC camps, multiple Scouts camps, multiple Proxima entries).
  - *Remedy:* Prune gallery to distinct, unique photos and events. Exclude the marquee's duplicated track from DOM accessibility tree (`aria-hidden="true"`) and exclude copies from the lightbox sequence.

---

### P0-C: Removal of CGPA Everywhere
- **Finding C1 (CGPA & Portal References):** CGPA `7.85` and the SOA Examination Result Portal link (`https://soaportals.com/StudentPortalSOA/#/`) are present in:
  - `src/data/profile.ts`
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/Certifications.tsx`
  - `src/components/layout/CommandPalette.tsx`
  - `src/app/layout.tsx` (Person JSON-LD & metadata)
  - `src/lib/gemini.ts`
  - `src/types/index.ts`
  - `README.md` and documentation files
  - *Remedy:* Completely remove `cgpa`, `resultPortalUrl`, and all references. Do not substitute other academic numbers.

---

### P1-A: Distinct Light and Dark Design Tokens
- **Finding D1 (Light Theme Inversion):** Light theme currently relies on high-contrast black borders and saturated dark overlays instead of a purpose-designed design system.
  - *Dark Theme Identity:* Deep navy background (`#070b14`), dark charcoal/navy cards (`#0e1526`), soft-white text (`#f1f5f9`), subtle cyan accent (`#00cfff`), low-contrast borders (`rgba(255,255,255,0.08)`), subtle glow.
  - *Light Theme Identity:* Clean off-white background (`#f8fafc` / `#f1f5f9`), pure white cards (`#ffffff`), dark charcoal typography (`#0f172a`), refined blue/teal accent (`#0284c7`), crisp light-grey borders (`#e2e8f0`), soft natural drop-shadows (no neon glow), particles minimal or disabled.
  - *Remedy:* Define dedicated CSS variables for each theme in `globals.css`; ensure zero theme flash on initial load.

---

### P1-B: Content Simplification, Expandable Evals & Skeletons
- **Finding E1 (Project Evaluation Walls of Text):** Featured projects contain long evaluation descriptions directly on the cards, cluttering the mobile view.
  - *Remedy:* Encapsulate detailed benchmark breakdowns inside an accessible, keyboard-operable expandable disclosure (`<details>` / "Evaluation details", collapsed by default).
- **Finding E2 (Credential Verification Labels):** Several credentials display "Available on request".
  - *Remedy:* Replace with direct verification links where available (e.g. Neo4j); show credential ID if present; otherwise hide the verify button and log the credential in `OPEN_ITEMS.md`.
- **Finding E3 (Data Error & Empty States):** Data-driven sections (GitHub, projects, chatbot) need graceful error boundaries and skeletons to prevent raw errors or blank surfaces if network calls fail.

---

## 3. Plan of Action & Implementation Order

1. **Step 1:** Expunge CGPA and SOA Result Portal link from all types, data, components, API routes, layout metadata, and tests (P0-C).
2. **Step 2:** Redesign mobile navigation: remove `MobileDock.tsx`, upgrade `MobileMenu.tsx` with smooth focus trap and ⌘K trigger, align header elements, enforce 44px tap targets (P0-A).
3. **Step 3:** Tighten Hero spacing on mobile, optimize particle density in `NeuralBackground.tsx`, and prevent chatbot overlap on form fields (P0-A).
4. **Step 4:** Rebuild `GalleryModal.tsx` and prune `gallery.ts` to unique, distinct photos and events (P0-B).
5. **Step 5:** Overhaul Light & Dark themes with dedicated CSS tokens in `globals.css` and `ThemeProvider.tsx` (P1-A).
6. **Step 6:** Content polish: expandable evaluation details, credential links, skeletons and error boundaries (P1-B).
7. **Step 7:** Full end-to-end verification across 360px, 390px, 430px, 768px, 1440px in both themes; run all tests, linters, and production build; push to `main`.
