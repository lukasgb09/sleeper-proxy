import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erlaube Zugriff auf den .well-known Ordner
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const SLEEPER_API = 'https://api.sleeper.app/v1';
const LEAGUE_ID = '1179359677791277056';

app.get('/league', async (req, res) => {
  const url = `${SLEEPER_API}/league/${LEAGUE_ID}`;
  const response = await axios.get(url);
  res.json(response.data);
});

app.get('/rosters', async (req, res) => {
  const url = `${SLEEPER_API}/league/${LEAGUE_ID}/rosters`;
  const response = await axios.get(url);
  res.json(response.data);
});

app.get('/matchups/:week', async (req, res) => {
  const { week } = req.params;
  const url = `${SLEEPER_API}/league/${LEAGUE_ID}/matchups/${week}`;
  const response = await axios.get(url);
  res.json(response.data);
});

app.listen(PORT, () => {
  console.log(`Sleeper Proxy läuft auf Port ${PORT}`);
});
