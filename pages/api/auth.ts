import type { NextApiRequest, NextApiResponse } from 'next';
require('dotenv').config();

interface Response {
  isAuthenticated : boolean;
}

interface ResponseError {
  message: string;
}


const accessToken: string = process.env.ACCESS_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

  return res.status(200).json({
    isAuthenticated: true
  });

}
