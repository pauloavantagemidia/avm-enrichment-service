import type { DebugLog } from "../types/enrichment";

export function pushLog(logs: DebugLog[], log: DebugLog): void {
  logs.push({
    etapa: log.etapa,
    metodo: log.metodo ?? null,
    input: log.input ?? null,
    url: log.url ?? null,
    resultado: log.resultado ?? null,
    erro: log.erro ?? null,
    payload: log.payload ?? {}
  });
}
