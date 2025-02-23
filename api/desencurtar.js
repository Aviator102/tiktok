export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "A URL não foi fornecida." });
    }

    try {
        // Fazendo a requisição à URL encurtada
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow', // Seguir redirecionamentos
        });

        // Retorna a URL final após o redirecionamento
        return res.status(200).json({ url: response.url });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao seguir o redirecionamento." });
    }
}
