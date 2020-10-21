import express from 'express';
import ApiRouter from 'api';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(ApiRouter);

app.listen(3000, () => {
  console.log('Running server on port 3000...');
});
