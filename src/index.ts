import express from 'express';
import ApiRouter from 'api';

const app = express();

app.use(ApiRouter);

app.listen(3000, () => {
  console.log('Running server on port 3000...');
});
