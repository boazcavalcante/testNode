const cors = require('cors');
const express = require('express');
const app = express();

let data = [{ "id": "1", "value": "5" }];
let id = 1;

app.use(cors());
app.use(express.json());
app.get('/data', (req, res) => res.status(200).json(data));
app.post('/data', (req, res) => {
  id += 1;
  data.push({ id: `${id}`, value: `${req.body.count}` });
  console.log("Data: ", data);
});
app.listen(3333, console.log("Servidor rodando"));