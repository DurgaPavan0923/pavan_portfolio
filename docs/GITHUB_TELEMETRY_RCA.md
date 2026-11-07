# Root Cause Analysis (RCA): GitHub Telemetry & Verified Contributions Stale Data

**Document ID:** `RCA-2026-11-07-GH-TELEMETRY`  
**Author:** Senior Full-Stack Engineer & QA Lead  
**Branch:** `fix/github-live-and-qa`  
**Target URL:** [https://pavan-portfolio-gamma-six.vercel.app/](https://pavan-portfolio-gamma-six.vercel.app/)  
**Target Profile:** [https://github.com/DurgaPavan0923](https://github.com/DurgaPavan0923)  
**Date of Audit:** November 7, 2026  

---

## 1. Executive Summary

A forensic technical audit of the **GitHub Telemetry & Verified Contributions** section (`#open-source`) revealed that the deployed portfolio was presenting outdated, inaccurate metrics and a corrupted contribution calendar. The public site rendered hardcoded build-time snapshot numbers (22 public repos, 226 contributions, 4 PRs, 2 issues) rather than live GitHub data (23 public repos, 258 contributions, 2 merged PRs, 0 issues), while the heatmap calendar was populated with reversed 2024 data.

This document identifies the five interacting root causes responsible for this failure across the Next.js 15 App Router architecture, serverless route caching, fallback error handling, and third-party API data structures.

---

## 2. Discrepancy Matrix: Deployed Site vs. Reality

| Metric | Deployed Site (Initial) | Raw GitHub API Reality | Discrepancy / Defect |
| :--- | :---: | :---: | :--- |
| **Public Repositories** | `22` | **`23`** | Missing newest repository (`RajanaDurgaPavanKumar_C1_ONLINETIHIITG` / `neetcode-submissions`). |
| **Annual Contributions (Last 12 Mos)** | `226` (HTML) / `257` (API) | **`258`** | Statically baked 226 in HTML; stale unauthenticated mirror returned 257. |
| **Merged Pull Requests** | `4` | **`2`** | 4 was a hardcoded fallback literal in `src/lib/github.ts:296`. Real author PR count is 2. |
| **Authored Issues** | `2` | **`0`** | 2 was a hardcoded fallback literal in `src/lib/github.ts:297`. Real author issue count is 0. |
| **Followers** | `22` | **`22`** | Matches (`followers: 22`). |
| **Total Stars** | `0` | **`0`** | Matches (`stargazerCount: 0`). |
| **Total Forks** | `0` | **`0`** | Matches (`forkCount: 0`). |
| **Current / Longest Streak** | `0d` / `5d` | **`0d` / `1d`** | Calendar slice in snapshot ended in 2024; streak was computed on 2-year-old dates. |
| **Contribution Calendar Dates** | `2025-12-27` to `2024-12-31` | **`2025-11-02` to `2026-11-07`** | Calendar array was sliced backwards from `jogruber.de`, capturing 2024 history instead of the last 365 days. |
| **Cache Badge Status** | `"Live · updated just now"` | **Stale / Fallback Data** | Green "Live" badge was displayed even when falling back to third-party mirrors and hardcoded literals. |

---

## 3. Detailed Root Cause Analysis

### 3.1 Root Cause 1: Static Prerendering of `/api/github` Route Handler in Next.js 15
- **Mechanism:** In Next.js 15 App Router, route handlers that do not access incoming request headers/cookies and lack an explicit dynamic directive default to static generation (`Route (app) ○ /api/github 145 B`).
- **Code in `src/app/api/github/route.ts`:**
  ```typescript
  export const revalidate = 3600; // Cache for 1 hour

  export async function GET() {
    try {
      const data = await fetchGitHubTelemetry('DurgaPavan0923');
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
  ```
- **Observed Behavior on Vercel:**
  When querying `https://pavan-portfolio-gamma-six.vercel.app/api/github`:
  - `X-Nextjs-Prerender: 1`
  - `X-Vercel-Cache: HIT`
  - `Cache-Control: public` (the custom `s-maxage` was overwritten by Next.js's static prerender header).
- **Impact:** The route handler was executed exactly once at build time on Vercel and frozen as a static JSON file. No runtime execution took place on incoming requests, preventing data freshness.

---

### 3.2 Root Cause 2: Lack of Client-Side Invalidation & Statically Baked Initial State
- **Mechanism:** In `src/components/sections/GitHubActivity.tsx`:
  ```typescript
  const INITIAL_DATA: GitHubTelemetryData = snapshotData as unknown as GitHubTelemetryData;

  export function GitHubActivity() {
    const [data, setData] = useState<GitHubTelemetryData>(INITIAL_DATA);
    useEffect(() => {
      async function loadTelemetry() {
        const res = await fetch('/api/github');
        if (res.ok) {
          const fetched = await res.json();
          setData(fetched);
        }
      }
      loadTelemetry();
    }, []);
  ```
- **Defects:**
  1. `INITIAL_DATA` directly imported `github-snapshot.json`, embedding stale numbers into the server-rendered HTML at build time.
  2. `useEffect(..., [])` ran only once on component mount. It did not implement polling or revalidation on focus.
  3. No client-side caching library (e.g., SWR) was utilized; if a visitor left the tab open, data never updated.

---

### 3.3 Root Cause 3: Corrupted Date Slicing & False "Live" Status in REST Fallback
- **Mechanism:** In `src/lib/github.ts`:
  ```typescript
  if (contribData && Array.isArray(contribData.contributions)) {
    const daysList = contribData.contributions.slice(-371);
  ```
- **Defects:**
  1. In the `jogruber.de` public API mirror, the `contributions` array lists years in reverse order (`[2026, 2025, 2024]`). Taking `slice(-371)` captured the tail of the array, which contained data from **year 2024**.
  2. When this was persisted to `src/data/github-snapshot.json`, the first date was `2025-12-27` and the last was `2024-12-31`.
  3. In `calculateStreaks()`, comparison against `todayStr` (`2026-11-07`) never matched dates in 2024, permanently breaking streak computation (`currentStreak: 0`, `longestStreak: 1`).
  4. The REST fallback block unconditionally returned `isStale: false` and `fetchedAt: new Date().toISOString()`, actively misrepresenting fallback/mirror data as an authentic "Live" fetch.
  5. Metrics for PRs (`totalPRs: 4`), commits (`totalCommits: 215`), and issues (`totalIssues: 2`) were hardcoded integer literals in the fallback object.

---

### 3.4 Root Cause 4: GraphQL Query Missing Explicit `from` and `to` DateTime Bounds
- **Mechanism:** In `src/lib/github.ts`:
  ```graphql
  contributionsCollection {
    totalCommitContributions
    totalPullRequestContributions
    totalIssueContributions
    contributionCalendar {
      totalContributions
      weeks { ... }
    }
  }
  ```
- **Defect:** `contributionsCollection` was invoked without `(from: $from, to: $to)`.
- **Impact:** When omitted, GitHub GraphQL defaults to the start of the current calendar year or an internal account window. For rolling 365-day annual audits across year boundaries, this results in truncated data or incomplete calendars.

---

### 3.5 Root Cause 5: Unhandled GraphQL `errors` Array & Missing Webhook Revalidation
- **Mechanism:**
  ```typescript
  if (response.ok) {
    const json = await response.json();
    const user = json.data?.user;
  ```
- **Defects:**
  1. GitHub GraphQL returns `HTTP 200 OK` even when errors occur (e.g., scope errors, query validation errors, rate limits). If `json.errors` was present and `json.data` was null, the error was silently ignored and treated as a missing user.
  2. The application provided no on-demand revalidation route (`/api/revalidate`) with an authenticated secret to purge the ISR cache upon new pushes or automated workflow triggers.

---

## 4. Remediation Plan

1. **Re-architect `/api/github`:**
   - Force dynamic execution (`export const dynamic = 'force-dynamic'`) with strict cache-control headers (`s-maxage=900, stale-while-revalidate=3600`).
   - Add `/api/revalidate` route protected by `REVALIDATE_SECRET` for on-demand ISR cache clearing.
2. **Harden `lib/github.ts`:**
   - Update GraphQL query to accept `$login: String!`, `$from: DateTime!`, and `$to: DateTime!` where `from = now - 365 days` and `to = now` (UTC ISO strings).
   - Fetch real counts: public repos, stars, forks, followers, commit contributions, PR contributions, issue contributions, review contributions, byte-weighted top languages, and pinned/recent repositories.
   - Parse and log GraphQL `errors` explicitly.
   - Refactor `calculateStreaks()` into a dedicated, thoroughly unit-tested utility handling timezone boundaries, zero-contribution days, and year-end transitions.
   - Truthful Stale State: If GraphQL fails and fallback data is used, set `isStale: true` and display *"Cached · last updated <timestamp>"*. Only display *"Live"* when the current fetch succeeded within the active window.
3. **Client-Side SWR Implementation:**
   - Integrate SWR in `GitHubActivity.tsx` with `refreshInterval: 300000` (5 minutes) and `revalidateOnFocus: true`.
   - Prevent initial hydration flash by synchronizing SSR and initial client state.
4. **Heatmap & Verified Contributions Subpanel:**
   - Render the genuine 371-day calendar through today with theme-aware levels, tooltips, and horizontal auto-scroll on mobile to the most recent weeks.
   - Add a verified contributions subpanel displaying authentic merged PRs and public commits (only when verified from the API).
5. **Automated Snapshot Cron & Script:**
   - Create `npm run snapshot:github` script to update `/data/github-snapshot.json` with authentic data.
   - Add GitHub Actions workflow (`.github/workflows/refresh-github-snapshot.yml`) running every 6 hours, committing only if data changed without leaking tokens.
