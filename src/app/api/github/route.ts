import { NextResponse } from "next/server";

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "rishabh-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    "https://api.github.com/users/Var6/repos?sort=updated&per_page=30&type=public",
    { headers, next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "GitHub API error", repos: [] }, { status: res.status });
  }

  const repos = await res.json();
  return NextResponse.json({ repos });
}
