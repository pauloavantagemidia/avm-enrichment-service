import { createBrowser } from "../utils/browser";
import { pushLog } from "../utils/logger";
import type { DebugLog } from "../types/enrichment";

export async function checkAds(nome: string, cidade: string, logs: DebugLog[]) {
  let browser;

  try {
    browser = await createBrowser();
    const page = await browser.newPage();

    const query = `${nome} ${cidade}`;
    const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&q=${encodeURIComponent(query)}`;

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const content = await page.content();

    pushLog(logs, {
      etapa: "ads_search",
      metodo: "browser",
      input: query,
      url,
      resultado: "busca executada"
    });

    if (content.toLowerCase().includes(nome.toLowerCase())) {
      return {
        ads_status: "confirmed_active",
        ads_match_query: query,
        ads_match_method: "browser",
        ads_match_confidence: "medium",
        ads_match_reason: "nome encontrado na página"
      };
    }

    return {
      ads_status: "inconclusive",
      ads_match_query: query,
      ads_match_method: "browser",
      ads_match_confidence: "low",
      ads_match_reason: "sem confirmação forte"
    };

  } catch (e) {
    pushLog(logs, {
      etapa: "ads_error",
      metodo: "browser",
      erro: String(e)
    });

    return {
      ads_status: "inconclusive",
      ads_match_query: `${nome} ${cidade}`,
      ads_match_method: "browser",
      ads_match_confidence: "low",
      ads_match_reason: "erro ao consultar"
    };
  } finally {
    await browser?.close();
  }
}
