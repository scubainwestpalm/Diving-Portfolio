import express from 'express';
import bodyParser from 'body-parser';
import diveSiteRouter from './routes';
import path from 'path';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    return next();
})

app.use(diveSiteRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})