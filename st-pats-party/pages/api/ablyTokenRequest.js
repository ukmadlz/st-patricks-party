import Ably from 'ably/promises';

export default async function handler(req, res) {
    if(!process.env.ABLY_KEY){
        res.status(500).json({
            message: 'No config for Ably'
        });
    }
    const client = new Ably.Realtime(process.env.ABLY_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'st-pats-partay' });
    res.status(200).json(tokenRequestData);
};