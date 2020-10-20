import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ title: 'Red Robot' });
});

app.listen(3000, () => {
  console.log('Running server on port 3000...');
});
