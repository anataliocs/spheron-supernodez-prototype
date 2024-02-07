import axios from 'axios';
import { SiweMessage } from 'siwe';

export const createSiweMessage = async (address: string, statement: string) => {
  const res = await axios.post(`http://localhost:8080/v1/auth/web3/nonce`, {
    withCredentials: true,
  });

  const domain = window.location.host;
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: 'http://localhost:8080/v1',
    version: '1',
    chainId: 1,
    nonce: res.data.nonce,
  });
  return {
    message,
    preparedMessage: message.prepareMessage(),
  };
};
