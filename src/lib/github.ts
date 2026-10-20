import snapshotData from '@/data/github-snapshot.json';

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
  calendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  fetchedAt: string;
  isStale: boolean;
}

const GITHUB_GRAPHQL_QUERY = `
query ($login: String!) {
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
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
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

function calculateStreaks(weeks: ContributionWeek[]): { currentStreak: number; longestStreak: number } {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .filter((d) => Boolean(d.date))
    .sort((a, b) => a.date.localeCompare(b.date));

  let longest = 0;
  let currentRun = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      currentRun++;
      if (currentRun > longest) {
        longest = currentRun;
      }
    } else {
      currentRun = 0;
    }
  }

  // Calculate current streak backwards from today
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let cur = 0;

  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.date > todayStr) continue;

    if (cur === 0) {
      // First matching day can be today or yesterday
      if (day.date === todayStr || day.date === yesterday) {
        if (day.contributionCount > 0) {
          cur = 1;
        } else if (day.date === todayStr) {
          // If 0 today, check yesterday
          continue;
        } else {
          break;
        }
      } else {
        break;
      }
    } else {
      if (day.contributionCount > 0) {
        cur++;
      } else {
        break;
      }
    }
  }

  return { currentStreak: cur, longestStreak: longest };
}

export async function fetchGitHubTelemetry(username = 'DurgaPavan0923'): Promise<GitHubTelemetryData> {
  const token = process.env.GITHUB_TOKEN;

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
          variables: { login: username },
        }),
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const json = await response.json();
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
              : r.name,
            description: r.description || 'Open-source engineering repository by DurgaPavan0923.',
            language: r.primaryLanguage?.name || 'Python',
            languageColor: r.primaryLanguage?.color || '#3572A5',
            stars: r.stargazerCount || 0,
            forks: r.forkCount || 0,
            url: r.url,
            updatedAt: r.pushedAt,
            updatedRelative: formatRelativeTime(r.pushedAt),
          }));

          const calWeeks: ContributionWeek[] = user.contributionsCollection?.contributionCalendar?.weeks || [];
          const streaks = calculateStreaks(calWeeks);

          return {
            username: user.login,
            publicRepos: user.repositories?.totalCount ?? 22,
            followers: user.followers?.totalCount ?? 22,
            totalStars,
            totalForks,
            totalContributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 226,
            totalCommits: user.contributionsCollection?.totalCommitContributions ?? 215,
            totalPRs: user.contributionsCollection?.totalPullRequestContributions ?? 4,
            totalIssues: user.contributionsCollection?.totalIssueContributions ?? 2,
            currentStreak: streaks.currentStreak,
            longestStreak: streaks.longestStreak,
            topLanguages: topLanguages.length > 0 ? topLanguages : (snapshotData as unknown as GitHubTelemetryData).topLanguages,
            featuredRepos,
            calendar: {
              totalContributions: user.contributionsCollection?.contributionCalendar?.totalContributions ?? 226,
              weeks: calWeeks,
            },
            fetchedAt: new Date().toISOString(),
            isStale: false,
          };
        }
      }
    } catch (err) {
      console.warn('GitHub GraphQL fetch failed, attempting REST & mirror fallback:', err);
    }
  }

  // 2. Fallback: Public REST + Public Contribution API
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'Pavan-Portfolio-REST' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
        headers: { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'Pavan-Portfolio-REST' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        next: { revalidate: 3600 },
      }).catch(() => null),
    ]);

    if (userRes.ok && reposRes.ok) {
      const userData = await userRes.json();
      const repos = await reposRes.json();
      const contribData = contribRes && contribRes.ok ? await contribRes.json() : null;

      const totalStars = Array.isArray(repos)
        ? repos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0), 0)
        : 0;
      const totalForks = Array.isArray(repos)
        ? repos.reduce((acc: number, r: { forks_count?: number }) => acc + (r.forks_count || 0), 0)
        : 0;

      const priorityRepoNames = [
        'AI-Powered-Fake-News-Detector-for-Students',
        'AI-Resume-Screening-Job-Match-System',
        'IRA',
        'AGORA-PROXIMA',
      ];

      const featuredRepos: FeaturedRepo[] = priorityRepoNames
        .map((name) => {
          const match = Array.isArray(repos) ? repos.find((r: { name: string }) => r.name === name) : null;
          if (!match) return null;
          return {
            name: match.name,
            displayName: match.name === 'AI-Powered-Fake-News-Detector-for-Students'
              ? 'FactLens AI'
              : match.name === 'AI-Resume-Screening-Job-Match-System'
              ? 'InsightAI ATS'
              : match.name,
            description: match.description || 'Open-source repository by DurgaPavan0923.',
            language: match.language || 'Python',
            languageColor: match.language === 'TypeScript' ? '#3178c6' : match.language === 'JavaScript' ? '#f1e05a' : '#3572A5',
            stars: match.stargazers_count || 0,
            forks: match.forks_count || 0,
            url: match.html_url,
            updatedAt: match.pushed_at,
            updatedRelative: formatRelativeTime(match.pushed_at),
          };
        })
        .filter((r): r is FeaturedRepo => Boolean(r));

      // Construct weeks from public mirror if available
      let calWeeks: ContributionWeek[] = (snapshotData as unknown as GitHubTelemetryData).calendar.weeks;
      let totalContribs = (snapshotData as unknown as GitHubTelemetryData).totalContributions;

      if (contribData && Array.isArray(contribData.contributions)) {
        const daysList = contribData.contributions.slice(-371);
        const weeks: ContributionWeek[] = [];
        for (let i = 0; i < daysList.length; i += 7) {
          const chunk = daysList.slice(i, i + 7);
          weeks.push({
            contributionDays: chunk.map((d: { date: string; count: number; level: number }, dIdx: number) => ({
              date: d.date,
              contributionCount: d.count,
              contributionLevel: d.level === 0 ? 'NONE' : d.level === 1 ? 'FIRST_QUARTILE' : d.level === 2 ? 'SECOND_QUARTILE' : d.level === 3 ? 'THIRD_QUARTILE' : 'FOURTH_QUARTILE',
              weekday: dIdx,
            })),
          });
        }
        if (weeks.length > 0) {
          calWeeks = weeks;
          totalContribs = contribData.total?.['2026'] || contribData.total?.['2025'] || 226;
        }
      }

      const streaks = calculateStreaks(calWeeks);

      return {
        username: userData.login,
        publicRepos: userData.public_repos || 22,
        followers: userData.followers || 22,
        totalStars,
        totalForks,
        totalContributions: totalContribs,
        totalCommits: 215,
        totalPRs: 4,
        totalIssues: 2,
        currentStreak: streaks.currentStreak,
        longestStreak: streaks.longestStreak,
        topLanguages: (snapshotData as unknown as GitHubTelemetryData).topLanguages,
        featuredRepos: featuredRepos.length > 0 ? featuredRepos : (snapshotData as unknown as GitHubTelemetryData).featuredRepos,
        calendar: {
          totalContributions: totalContribs,
          weeks: calWeeks,
        },
        fetchedAt: new Date().toISOString(),
        isStale: false,
      };
    }
  } catch (err) {
    console.warn('Public REST fallback failed, using local verified snapshot:', err);
  }

  // 3. Fallback to cached snapshot
  const fallback = snapshotData as unknown as GitHubTelemetryData;
  return {
    ...fallback,
    isStale: true,
  };
}
