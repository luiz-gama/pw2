import dotenv from 'dotenv';

dotenv.config();

let generateDocs: ((outputFile: string, endpointsFiles: string[], doc: Record<string, unknown>) => Promise<void>) | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  generateDocs = require('swagger-autogen')();
} catch (error) {
  console.warn('swagger-autogen não está instalado. Pule a geração de documentação.');
}

const doc = {
  info: {
    title: 'API da Loja virtual',
    description: 'Documentação da API'
  },
  host: `${process.env.HOST ?? 'localhost'}:${process.env.PORT ?? '6677'}`
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/index.ts'];

if (generateDocs) {
  generateDocs(outputFile, routes, doc).catch((error: unknown) => {
    console.error('Falha ao gerar documentação Swagger:', error);
  });
}
