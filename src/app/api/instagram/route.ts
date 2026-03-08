import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ media: [], configured: false });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return NextResponse.json({ media: [], configured: true, error: "Fetch failed" });
    }
    const data = await res.json();
    return NextResponse.json({ media: data.data ?? [], configured: true });
  } catch {
    return NextResponse.json({ media: [], configured: true, error: "Unknown error" });
  }
}
