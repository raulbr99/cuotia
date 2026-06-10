import { ADSENSE_CLIENT } from "@/lib/adsense";

// ads.txt que exige AdSense para autorizar el pago. Se genera desde el mismo
// ID de editor del layout: google.com, pub-XXXX, DIRECT, f08c47fec0942fa0
export function GET() {
  const pub = ADSENSE_CLIENT.replace(/^ca-/, "");
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
