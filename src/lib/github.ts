import snapshotData from '@/data/github-snapshot.json';
import { calculateStreaks } from './streak';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface TopLanguage {
  name: string;
  percentage: number;
  color?: string;
}

export interface FeaturedRepo {
  name: string;
  displayName?: string;
  description: string;
  language: string;
  languageColor?: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
  updatedRelative?: string;
}

export interface VerifiedContribution {
  id: string;
  type: 'PR' | 'COMMIT';
  title: string;
  repo: string;
  url: string;
  date: string;
  relativeDate?: string;
}

export interface GitHubTelemetryData {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  currentStreak: number;
  longestStreak: number;
  topLanguages: TopLanguage[];
  featuredRepos: FeaturedRepo[];
  verifiedContributions: VerifiedContribution[];
  calendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  fetchedAt: string;
  isStale: boolean;
}

const GITHUB_GRAPHQL_QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    name
    login
    avatarUrl
    bio
    followers { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        pushedAt
        isPrivate
        isFork
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          pushedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
    pullRequests(first: 10, states: [MERGED], orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        id
        title
        url
        mergedAt
        repository {
          nameWithOwner
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
            contributionLevel
          }
        }
      }
    }
  }
}
`;

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears}y ago`;
  } catch {
    return 'recently';
  }
}

export async function fetchGitHubTelemetry(username = 'DurgaPavan0923'): Promise<GitHubTelemetryData> {
  const token = process.env.GITHUB_TOKEN;
  const now = new Date();
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const fromIso = oneYearAgo.toISOString();
  const toIso = now.toISOString();

  // 1. Try GraphQL if GITHUB_TOKEN is available
  if (token) {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'Pavan-Portfolio-GraphQL',
        },
        body: JSON.stringify({
          query: GITHUB_GRAPHQL_QUERY,
          variables: {
            login: username,
            from: fromIso,
            to: toIso,
          },
        }),
        next: { revalidate: 900 },
      });

      if (response.ok) {
        const json = await response.json();

        if (json.errors && Array.isArray(json.errors) && json.errors.length > 0) {
          console.warn('GitHub GraphQL returned errors:', json.errors);
        }

        const user = json.data?.user;

        if (user) {
          const repos = user.repositories?.nodes || [];
          const totalStars = repos.reduce((acc: number, r: { stargazerCount?: number }) => acc + (r.stargazerCount || 0), 0);
          const totalForks = repos.reduce((acc: number, r: { forkCount?: number }) => acc + (r.forkCount || 0), 0);

          // Byte-weighted languages
          const languageSizes: Record<string, { size: number; color?: string }> = {};
          for (const repo of repos) {
            const edges = repo.languages?.edges || [];
            for (const edge of edges) {
              const langName = edge.node?.name;
              const size = edge.size || 0;
              if (langName) {
                if (!languageSizes[langName]) {
                  languageSizes[langName] = { size: 0, color: edge.node?.color };
                }
                languageSizes[langName].size += size;
              }
            }
          }

          const totalBytes = Object.values(languageSizes).reduce((acc, l) => acc + l.size, 0);
          const topLanguages: TopLanguage[] = Object.entries(languageSizes)
            .map(([name, data]) => ({
              name,
              percentage: totalBytes > 0 ? Math.round((data.size / totalBytes) * 100) : 0,
              color: data.color,
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);

          // Pinned or top repos
          let rawFeatured = (user.pinnedItems?.nodes || []).filter((r: { name?: string }) => Boolean(r && r.name));
          if (rawFeatured.length === 0) {
            rawFeatured = repos.filter((r: { isFork?: boolean }) => !r.isFork).slice(0, 4);
          }

          const featuredRepos: FeaturedRepo[] = rawFeatured.slice(0, 4).map((r: {
            name: string;
            description?: string;
            url: string;
            stargazerCount?: number;
            forkCount?: number;
            pushedAt: string;
            primaryLanguage?: { name: string; color?: string };
          }) => ({
            name: r.name,
            displayName: r.name === 'AI-Powered-Fake-News-Detector-for-Students'
              ? 'FactLens AI'
              : r.name === 'AI-Resume-Screening-Job-Match-System'
              ? 'InsightAI ATS'
              : r.name === 'IRA'
              ? 'IRA 3D Smart City'
              : r.name === 'AGORA-PROXIMA'
              ? 'AGORA Proxima'
              : r.name,
            description: r.description || 'Open-source repository by DurgaPavan0923.',
            language: r.primaryLanguage?.name || 'Python',
            languageColor: r.primaryLanguage?.color || '#3572A5',
            stars: r.stargazerCount || 0,
            forks: r.forkCount || 0,
            url: r.url,
            updatedAt: r.pushedAt,
            updatedRelative: formatRelativeTime(r.pushedAt),
          }));

          // Verified PRs from GraphQL
          const verifiedContributions: VerifiedContribution[] = (user.pullRequests?.nodes || []).map((pr: {
            id: string;
            title: string;
            url: string;
            mergedAt: string;
            repository?: { nameWithOwner?: string };
          }) => ({
            id: pr.id,
            type: 'PR',
            title: pr.title,
            repo: pr.repository?.nameWithOwner || `${username}/repo`,
            url: pr.url,
            date: pr.mergedAt,
            relativeDate: formatRelativeTime(pr.mergedAt),
          }));

          const calWeeks: ContributionWeek[] = user.contributionsCollection?.contributionCalendar?.weeks || [];
          const streaks = calculateStreaks(calWeeks);

          return {
            username: user.login,
            publicRepos: user.repositories?.totalCount ?? 23,
            followers: user.followers?.totalCount ?? 22,
            totalStars,
            totalForks,
            totalContributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 258,
            totalCommits: user.contributionsCollection?.totalCommitContributions ?? 215,
            totalPRs: verifiedContributions.length,
            totalIssues: user.contributionsCollection?.totalIssueContributions ?? 0,
            currentStreak: streaks.currentStreak,
            longestStreak: streaks.longestStreak,
            topLanguages: topLanguages.length > 0 ? topLanguages : (snapshotData as unknown as GitHubTelemetryData).topLanguages,
            featuredRepos,
            verifiedContributions,
            calendar: {
              totalContributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 258,
              weeks: calWeeks,
            },
            fetchedAt: new Date().toISOString(),
            isStale: false,
          };
        }
      }
    } catch (err) {
      console.warn('GitHub GraphQL fetch failed, attempting fallback pipeline:', err);
    }
  }

  // 2. Fallback: Public REST + Cached Verified Snapshot
  // When running without GITHUB_TOKEN or when rate-limited, serve verified snapshot
  // explicitly marked as isStale: true with the authentic timestamp.
  const fallback = snapshotData as unknown as GitHubTelemetryData;
  return {
    ...fallback,
    isStale: true,
  };
}

export const FALLBACK_GITHUB_STATS = snapshotData as unknown as GitHubTelemetryData;
export const fetchGitHubData = fetchGitHubTelemetry;
