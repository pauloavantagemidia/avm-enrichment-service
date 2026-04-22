const port = Number(process.env.PORT) || 3000;

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`Servidor rodando na porta ${port}`);
});
