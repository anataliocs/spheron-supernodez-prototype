import type { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

interface Response {
  isAuthenticated : boolean;
}

interface ResponseError {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

    console.log("Parameters");
    console.log(req);
    console.log(req.body.accountAddress);
    console.log(req.body.message);
    console.log(req.body.signature);

    const accountAddress: string = req.body.accountAddress;
    const message: string = req.body.message;
    const signature: string = req.body.signature;
    const type: string = 'signup';
    const referralCode = '';

    const url = `https://api-dev.spheron.network/v1/auth/web3/callback?state=${type}&address=${accountAddress}
    &message=${JSON.stringify(message)}
    &signature=${JSON.stringify(signature)}
    &referralCode=${referralCode}`;

    console.log(url);

    const params = {
        state: 'signup',
        accountAddress,
        message,
        signature,
        referralCode: '',
    };

//    const responseToken = await axios.get(url, {
//        params,
//        headers: {
//            Authorization: `Bearer ${nonce}`,
//        },
//    });

    console.log(url);

    return res.status(200).json({
        isAuthenticated: true
    });

}
