export async function checkSite(site?: string | null): Promise<boolean | null> {
  if (!site) return null;

  try {
    const response = await fetch(site, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    if (!response.ok) return false;

    const html = await response.text();
    return html.length > 500;
  } catch {
    return false;
  }
}
