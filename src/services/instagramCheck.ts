import { createBrowser } from "../utils/browser";
import { pushLog } from "../utils/logger";
import type { DebugLog } from "../types/enrichment";

export async function checkInstagram(nome: string, cidade: string, instagram: string | null | undefined, logs: DebugLog[]) {
  let browser;

  try {
    browser = await createBrowser();
    const page = await browser.newPage();

    const query = `${nome} ${cidade} instagram`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();

    pushLog(logs, {
      etapa: "google_search_instagram",
      metodo: "browser",
      input: query,
      url,
      resultado: "busca executada"
    });

    const match = content.match(/instagram\.com\/[A-Za-z0-9._]+/);

    if (match) {
      return {
        instagram_status: "inconclusive",
        instagram_handle: match[0].split("instagram.com/")[1],
        instagram_url: `https://${match[0]}`,
        instagram_check_method: "browser",
        instagram_recent_activity_signal: "unknown",
        posts_ig_15d: null,
        atividade_recente_status: "desconhecida"
      };
    }

    return {
      instagram_status: "not_found",
      instagram_handle: null,
      instagram_url: null,
      instagram_check_method: "browser",
      instagram_recent_activity_signal: "unknown",
      posts_ig_15d: null,
      atividade_recente_status: "desconhecida"
    };

  } catch (e) {
    pushLog(logs, {
      etapa: "instagram_error",
      metodo: "browser",
      erro: String(e)
    });

    return {
      instagram_status: "inconclusive",
      instagram_handle: null,
      instagram_url: null,
      instagram_check_method: "browser",
      instagram_recent_activity_signal: "unknown",
      posts_ig_15d: null,
      atividade_recente_status: "desconhecida"
    };
  } finally {
    await browser?.close();
  }
}
