import { createSiweMessage } from './createSiweMessage';
import { getSigner } from './signer';

export const signin = async () => {
  const { signer, address } = await getSigner();
  const { message, preparedMessage } = await createSiweMessage(
    address,
    'Sign in with Ethereum to the app.'
  );
  const signature = await signer.signMessage(preparedMessage);
  const type = 'LOGIN';
  const referralCode = '';

  const url = `http://localhost:8080/v1/auth/web3/callback?state=${type}&address=${address}&message=${JSON.stringify(
    message
  )}&signature=${signature}&referralCode=${referralCode}`;
  window.open(url, '_blank');
};
