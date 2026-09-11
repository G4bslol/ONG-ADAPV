import 'temporal-polyfill/full/global'
import { app } from './app.js';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});