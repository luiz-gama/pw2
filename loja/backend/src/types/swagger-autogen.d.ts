declare module 'swagger-autogen' {
  type Route = string;
  type Document = Record<string, unknown>;
  type Generate = (outputFile: string, endpointsFiles: Route[], data: Document) => Promise<void>;
  const swaggerAutogen: (options?: Record<string, unknown>) => Generate;
  export default swaggerAutogen;
}
