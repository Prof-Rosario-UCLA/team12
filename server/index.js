import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Pantry Pal Server!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 