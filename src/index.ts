import express from 'express';

const app = express();

app.use(express.static(__dirname + '/../public'))

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(9092, () => console.log('Running in localhost:3000!'));
