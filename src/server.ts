import Fastify from "fastify";
import { enrichLeadRoute } from "./routes/enrichLead";

const app = Fastify({
  logger: true
});

app.get("/", async () => {
  return { ok: true, service: "avm-enrichment-service" };
});

app.register(enrichLeadRoute);

const port = Number(process.env.PORT || 3000);

app.listen({ port, host: "0.0.0.0" })
  .then(() => {
    console.log(`Servidor rodando na porta ${port}`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
