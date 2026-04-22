import Fastify from "fastify";
import { enrichLeadRoute } from "./routes/enrichLead";

const app = Fastify();

app.get("/", async () => {
  return { ok: true };
});

app.register(enrichLeadRoute);

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Servidor rodando em http://localhost:3000");
});
