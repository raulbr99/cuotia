"use client";

import { useState } from "react";

interface Result {
  ok?: boolean;
  status?: string;
  slug?: string;
  title?: string;
  qaScore?: number;
  issues?: string[];
  reason?: string;
  error?: string;
}

export function GenerateBlogPanel() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(await res.json());
    } catch (e) {
      setResult({ error: e instanceof Error ? e.message : "Error de red" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-2">
          ADMIN_TOKEN
        </label>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Bearer token del servidor"
          className="w-full border border-neutral-300 px-3 py-2 text-sm focus:border-[#B91C1C] focus:outline-none"
        />
      </div>

      <button
        onClick={generate}
        disabled={loading || !token}
        className="bg-[#B91C1C] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
      >
        {loading ? "Generando… (puede tardar ~1 min)" : "Generar post ahora"}
      </button>

      {result && (
        <div className="mt-4 border border-neutral-200 bg-white p-4 text-sm">
          {result.error ? (
            <p className="text-[#B91C1C]">Error: {result.error}</p>
          ) : result.status === "published" ? (
            <div className="space-y-1">
              <p className="font-semibold text-green-700">✓ Publicado (QA {result.qaScore})</p>
              <p className="text-neutral-700">{result.title}</p>
              <a href={`/blog/${result.slug}`} className="text-[#B91C1C] underline">
                /blog/{result.slug}
              </a>
            </div>
          ) : result.status === "draft" ? (
            <div className="space-y-1">
              <p className="font-semibold text-amber-700">⚠ Guardado como borrador (QA {result.qaScore})</p>
              <p className="text-neutral-700">{result.title}</p>
              {result.issues?.length ? (
                <ul className="list-disc list-inside text-neutral-600 text-[13px]">
                  {result.issues.map((i, k) => (
                    <li key={k}>{i}</li>
                  ))}
                </ul>
              ) : null}
              <p className="text-[13px] text-neutral-500">{result.reason}</p>
            </div>
          ) : (
            <p className="text-neutral-700">Sin publicar: {result.reason}</p>
          )}
        </div>
      )}
    </div>
  );
}
