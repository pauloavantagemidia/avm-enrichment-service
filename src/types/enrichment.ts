export type EnrichmentRequest = {
  lead_id: string;
  nome: string;
  cidade: string;
  estado: string;
  telefone?: string | null;
  site?: string | null;
  instagram?: string | null;
  segmento?: string | null;
};

export type DebugLog = {
  etapa: string;
  metodo?: string | null;
  input?: string | null;
  url?: string | null;
  resultado?: string | null;
  erro?: string | null;
  payload?: Record<string, unknown>;
};

export type EnrichmentResponse = {
  success: boolean;
  lead_id: string;
  site_funcional: boolean | null;
  instagram_status: "confirmed_active" | "confirmed_inactive" | "not_found" | "blocked" | "inconclusive";
  instagram_handle: string | null;
  instagram_url: string | null;
  instagram_check_method: "html" | "browser" | "visual_ai" | null;
  instagram_recent_activity_signal: "strong" | "weak" | "none" | "unknown" | null;
  posts_ig_15d: number | null;
  ads_status: "confirmed_active" | "not_found" | "inconclusive";
  ads_match_query: string | null;
  ads_match_method: "text" | "browser" | "visual_ai" | "mock" | null;
  ads_match_confidence: "high" | "medium" | "low" | null;
  ads_match_reason: string | null;
  atividade_recente_status: "ativa" | "fraca" | "ausente" | "desconhecida" | null;
  debug_logs: DebugLog[];
};
