import dotenv from "dotenv";
import { cleanEnv, str, port, num } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  // Config do servidor HTTP
  PORT: port({ default: 6677 }),
  HOST: str({ default: "0.0.0.0" }),

  // Banco de dados para Prisma
  DATABASE_URL: str(),
  // opcional se você usa Shadow DB com Prisma (migrations avançadas)
  SHADOW_DATABASE_URL: str({ default: "" }),

  // Idioma padrão (pro seu middleware de idioma)
  DEFAULT_LANGUAGE: str({ default: "pt-BR" }),

  // Sessão / segurança
  SESSION_SECRET: str(),
  BCCRYPTO_ROUNDS: num({ default: 10 }),

  // 👇 NOVOS CAMPOS PARA A SESSÃO HTTP
  SESSION_NAME: str({ default: "sid" }),
  SESSION_MAX_AGE_MS: num({ default: 1000 * 60 * 60 * 2 }), // 2h em ms

  // Config do MySQL usado pelo express-mysql-session
  DB_HOST: str({ default: "db" }),      // nome do serviço no docker compose
  DB_PORT: num({ default: 3306 }),      // porta interna do MySQL
  DB_USER: str({ default: "root" }),    // ou o usuário que você definiu
  DB_PASS: str(),                       // obrigatório -> precisa estar no .env
  DB_NAME: str({ default: "loja" }),    // nome do banco
});

export default env;
