export type GitHubProfile = {
  public_repos: number;
  followers: number;
  location: string | null;
  bio: string | null;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  fork: boolean;
};

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "rishabh-portfolio",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function fetchGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch("https://api.github.com/users/Var6", {
      headers: ghHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/Var6/repos?sort=updated&per_page=100&type=public",
      { headers: ghHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork);
  } catch {
    return [];
  }
}

/** Sum of stars across all repos */
export function totalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}

/** Build a map of lowercase repo name → { stars, forks } for card display */
export function repoStatsMap(repos: GitHubRepo[]): Record<string, { stars: number; forks: number }> {
  const map: Record<string, { stars: number; forks: number }> = {};
  for (const r of repos) {
    map[r.name.toLowerCase()] = {
      stars: r.stargazers_count,
      forks: r.forks_count,
    };
  }
  return map;
}
