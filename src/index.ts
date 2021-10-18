import express from 'express';
import { authMiddleware } from './authMiddleware'

const app = express();

app.use(express.static(__dirname + '/../public'))

app.get('/', (_req, res) => {
    res.sendFile('index.html');
});

app.get('/authenticated', authMiddleware, (_req, res) => {
    const userId = res.locals.userId;
    res.json({
        value: 'Protected info',
        userId
    })
})

app.listen(9092, () => console.log('Running in localhost:9092!'));
