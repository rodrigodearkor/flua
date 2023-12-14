import { PrismaClient } from "@prisma/client";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import OpenAI from "openai";

const app = fastify();
const openai = new OpenAI()
const prisma = new PrismaClient();

app.get("/anos-escolares", async () => await prisma.anoEscolar.findMany());
app.get("/componentes-curriculares", async () => await prisma.componenteCurricular.findMany());
app.get("/habilidades-desenvolvidas", async () => await prisma.habilidadeDesenvolvida.findMany());
app.get("/empenho-aluno", async () => await prisma.empenhoAluno.findMany());
app.get("/planejar-avancar", async (request: FastifyRequest<{
  Querystring: {
    anoEscolar: string,
    componenteCurricular: string,
    habilidadeDesenvolvida: string,
    empenhoAluno: string,
  };
}>,
reply: FastifyReply,) => {

  const anoEscolar = +request.query.anoEscolar;
  const componenteCurricular = +request.query.componenteCurricular;
  const habilidadeDesenvolvida = +request.query.habilidadeDesenvolvida;
  const empenhoAluno = +request.query.empenhoAluno;
  const theAction = await prisma.historicoAcoes.findFirst({
    where: {
      anoEscolar, componenteCurricular, habilidadeDesenvolvida, empenhoAluno
    }
  })

  if (theAction) {
    const planejarAvancar = await prisma.planejarAvancar.findUnique({
      where: { id: theAction?.planejarAvancar }
    })

    if (planejarAvancar) {
      const { prompt: content } = planejarAvancar;

      const { choices } = await openai.chat.completions.create({
        messages: [
          { role: "user", content }
        ],
        model: "gpt-3.5-turbo-16k-0613",
      });

      const response = {
        choices
      }
    
      console.log(JSON.stringify(response, null, 2));

      reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(response)
      return;
    }
    
  }

  reply.code(404)
});

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => console.log("Server is running"));
