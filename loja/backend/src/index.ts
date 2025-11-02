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

// The express-mysql-session factory typing can be picky depending on how TS resolves
// the express-session module. Cast the factory to accept a looser type to avoid the
// mismatch while keeping runtime behavior intact.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MySQLStore = (MySQLStoreFactory as unknown as (s: any) => any)(session);

// cria um store de sessão persistente no MySQL
const sessionStore = new MySQLStore({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
});

const app = express();
const PORT = env.PORT;

// registra o middleware de sessão
app.use(session({
  genid: () => uuidv4(),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    // duração do cookie de sessão no cliente (2h aqui)
    maxAge: 1000 * 60 * 60 * 2,
    // você pode ajustar depois: secure, sameSite, etc.
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(createLangCookie);

// rota pública simples
app.get('/', (_req, res) => {
  res.send('Olá, bem-vindo(a) ao curso de PW2!');
});

// rotas da API (login, register, etc)
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
