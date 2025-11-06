import dotenv from 'dotenv';

dotenv.config();

const doc = {
  info: {
    title: 'API da Loja virtual',
    description: 'Documentação da API'
  },
  host: `${(globalThis as any).process?.env?.HOST ?? 'localhost'}:${(globalThis as any).process?.env?.PORT ?? '6677'}`
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/index.ts'];

(async () => {
  try {
    const swaggerAutogen = await import('swagger-autogen');
    const generateDocs = (swaggerAutogen.default ?? swaggerAutogen)();
    await generateDocs(outputFile, routes, doc);
  } catch (error) {
    (globalThis as any).console.warn('swagger-autogen não está instalado. Pule a geração de documentação.');
  }
})().catch((error: unknown) => {
  (globalThis as any).console.error('Falha ao gerar documentação Swagger:', error);
});
