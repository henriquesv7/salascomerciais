import { spawn } from 'child_process'; // Para executar o PHP

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const phpProcess = spawn('php', ['assets/processa_formulario.php'], { // Ajuste o caminho para o seu arquivo PHP
        input: JSON.stringify(req.body) // Envia os dados do formulário para o PHP via stdin
      });

      let phpOutput = '';
      phpProcess.stdout.on('data', data => {
        phpOutput += data;
      });

      phpProcess.stderr.on('data', data => {
        console.error(`PHP Error: ${data}`);
        return res.status(500).json({ error: 'Erro ao processar o formulário.' }); // Retorna erro
      });

      phpProcess.on('close', code => {
        if (code === 0) {
          return res.status(200).send(phpOutput); // Envia a resposta do PHP para o cliente
        } else {
          return res.status(500).json({ error: 'Erro ao executar o script PHP.' }); // Retorna erro
        }
      });


    } catch (error) {
      console.error("Erro na função serverless:", error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).end(); // Método não permitido (apenas POST)
  }
}