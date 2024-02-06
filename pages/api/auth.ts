import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
require('dotenv').config();

interface Request {
    addressString: string;
    siweMessage: string;
    signature: string;
    nonceResponse: string;
}

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
    console.log(req.query);
    console.log(req.body.addressString);
    console.log(req.body.siweMessage);
    console.log(req.body.signature);

    const accountAddress: string = req.body.addressString;
    const message: string = req.body.siweMessage;
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

    const responseToken = await axios.get(url);



    return res.status(200).json({
        isAuthenticated: true
    });

}
