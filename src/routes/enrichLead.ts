import { FastifyInstance } from "fastify";
import { z } from "zod";
import { checkSite } from "../services/siteCheck";
import { checkInstagram } from "../services/instagramCheck";
import { checkAds } from "../services/adsCheck";
import { pushLog } from "../utils/logger";

const schema = z.object({
  lead_id: z.string(),
  nome: z.string(),
  cidade: z.string(),
  estado: z.string(),
  telefone: z.string().nullable().optional(),
  site: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  segmento: z.string().nullable().optional()
});

export async function enrichLeadRoute(app: FastifyInstance) {
  app.post("/enrich-lead", async (req, reply) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      return reply.status(400).send({ error: "payload inválido" });
    }

    const data = parsed.data;
    const logs = [];

    const site = await checkSite(data.site);
    const ig = await checkInstagram(data.nome, data.cidade, data.instagram, logs);
    const ads = await checkAds(data.nome, data.cidade, logs);

    return {
      success: true,
      lead_id: data.lead_id,
      site_funcional: site,
      ...ig,
      ...ads,
      debug_logs: logs
    };
  });
}
