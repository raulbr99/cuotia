import type { NextConfig } from "next";

// Host del Storage de Supabase (derivado de la env) para permitir las portadas
// generadas en next/image.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost }]
      : [{ protocol: "https", hostname: "**.supabase.co" }],
  },
};

export default nextConfig;
