import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { router } from './routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
