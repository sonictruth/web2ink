import express, { Request, Response } from 'express';
import { setRoutes } from './routes';
import { ErrorRequestHandler, NextFunction } from 'express';

const app = express();
const port = process.env.PORT || 3000;
const auth = process.env.AUTH || 'changeme';

app.use((req: Request, res: Response, next: NextFunction) => {
  if(req.query.auth !== auth) {
    res.status(401).send({ error: 'Unauthorized' });
  } else {
    next();
  }
});

app.use(express.json());

setRoutes(app);

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message })
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});