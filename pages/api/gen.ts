import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            version: "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",

            input: { prompt: req.body.prompt },
        }),
    });

    if (response.status !== 201) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
    }

    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}
