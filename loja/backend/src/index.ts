import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import { v4 as uuidv4 } from 'uuid';

import createLangCookie from './middlewares/createLangCookie';
import router from './router/router';
import env from './utils/getEnv';

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuario: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MySQLStore = (MySQLStoreFactory as unknown as (s: any) => any)(session);

// cria um store de sessão persistente no MySQL
const sessionStore = new MySQLStore({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,

  // 👉 manda criar a tabela se não existir
  createDatabaseTable: true,

  // (opcional, mas bom pra ficar explícito)
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
});

const app = express();
const PORT = env.PORT;

// registra o middleware de sessão
app.use(session({
  name: env.SESSION_NAME,            // usa o nome definido no .env (sid, etc.)
  genid: () => uuidv4(),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: env.SESSION_MAX_AGE_MS,  // 2h, vindo do .env já como número
    // secure: true, // depois você ajusta pra produção
    // sameSite: 'lax',
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(createLangCookie);

app.get('/', (_req, res) => {
  res.send('Olá, bem-vindo(a) ao curso de PW2!');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
