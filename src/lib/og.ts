const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://calc-autonomo.vercel.app";

export function ogImage(opts: { title: string; subtitle?: string; tag?: string }): string {
  const params = new URLSearchParams();
  params.set("title", opts.title);
  if (opts.subtitle) params.set("subtitle", opts.subtitle);
  if (opts.tag) params.set("tag", opts.tag);
  return `${BASE}/api/og?${params.toString()}`;
}
