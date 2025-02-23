export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "A URL não foi fornecida." });
    }

    try {
        // Faz a requisição para obter a URL real (seguindo o redirecionamento)
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow', // Segue o redirecionamento da URL
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const finalUrl = response.url;
            
            // Retorna a URL final (verdadeira)
            return res.status(200).json({ url: finalUrl });
        } else {
            return res.status(500).json({ error: "Erro ao acessar a URL." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao seguir o redirecionamento." });
    }
}
