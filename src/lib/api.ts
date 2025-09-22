const BASE = process.env.NEXT_PUBLIC_API_BASE!;

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;
  console.log("🌐 Fetching:", url);
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch ${url} → ${res.status} ${res.statusText} ${text.slice(0,200)}`);
  }
  return (res.status === 204 ? (undefined as T) : await res.json());
}
