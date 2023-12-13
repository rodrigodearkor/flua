import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

const app = fastify();

const prisma = new PrismaClient();

app.get("/anos-escolares", async () => await prisma.anoEscolar.findMany());
app.get("/componentes-curriculares", async () => await prisma.componenteCurricular.findMany());
app.get("/habilidades-desenvolvidas", async () => await prisma.habilidadeDesenvolvida.findMany());
app.get("/empenho-aluno", async () => await prisma.empenhoAluno.findMany());
app.get("/planejar-avancar", async () => await prisma.anoEscolar.findMany());

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server is running"));
