const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const apiUrl = `/api/processa_formulario`; // Caminho relativo à função serverless

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(req.body)
      });

      const data = await response.text();

      return res.status(response.status).send(data);

    } catch (error) {
      console.error("Erro na função serverless:", error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).end();
  }
}