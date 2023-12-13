import { PrismaClient } from "@prisma/client";
import { anosEscolares, componentesCurriculares, planejarAvancar, empenhosAlunos, habilidadesDesenvolvidas } from "./data";

const prisma = new PrismaClient();

async function main() {
  await prisma.anoEscolar.createMany({ data: anosEscolares });
  await prisma.componenteCurricular.createMany({ data: componentesCurriculares });
  await prisma.habilidadeDesenvolvida.createMany({ data: habilidadesDesenvolvidas });
  await prisma.empenhoAluno.createMany({ data: empenhosAlunos });
  await prisma.planejarAvancar.createMany({ data: planejarAvancar });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
