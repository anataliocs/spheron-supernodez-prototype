import axios from 'axios';
import { createSiweMessage } from './createSiweMessage';
import { getSigner } from './signer';

export const signin = async () => {
  const { signer, address } = await getSigner();
  const message = await createSiweMessage(
    address,
    'Sign in with Ethereum to the app.'
  );
  const signature = await signer.signMessage(message);
  const type = 'signup';
  const referralCode = '';

  console.log(message);

  const res = await axios.get(
    `https://api-dev.spheron.network/v1/auth/web3/callback?state=${type}&address=${address}&message=${JSON.stringify(
      message
    )}&signature=${signature}&referralCode=${referralCode}`
  );

  console.log(res);

  // window.open(
  //   `http://localhost:8080/auth/web3/callback?state=${type}&address=${address}&message=${JSON.stringify(
  //     message
  //   )}&signature=${signature}&referralCode=${referralCode}`,
  //   '_blank'
  // );

  // const response = await res.json();
  // const stringifySession = JSON.stringify(response);
  // localStorage.setItem('session', stringifySession);
};
