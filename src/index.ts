import express, { Request, Response } from 'express';
import { authMiddleware } from './authMiddleware';
import { alreadyAuthenticatedMiddleware } from './alreadyAuthenticatedMiddleware';

const app = express();

app.use(express.static(__dirname + '/../public'))
app.use(express.json());

app.post('/', (_req, res) => {
    res.sendFile('index.html');
});

app.post('/login', authMiddleware)
app.get('/authenticated', alreadyAuthenticatedMiddleware, ( _req: Request, res: Response) => {
  const userId = res.locals['userid'];

  res.json({
      value: 'Protected Route',
      userId
  })
})

app.listen(9092, () => console.log('Running in localhost:9092!'));
