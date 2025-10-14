import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import createLangCookie from './middlewares/createLangCookie';
import router from './router/router';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 6677;

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
