import { useState } from 'react';
import axios from 'axios';
import useStore from '../helpers/store';
import LoadingSpinner from './icons/LoadingSpinner';
import JSConfetti from 'js-confetti';
import styles from '../styles/Button.module.css';
import {BrowserProvider} from "ethers";
import {SiweMessage} from "siwe";

const Button = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);

  const getNonce = async () => {
    const res = await axios.post(
        `https://api-dev.spheron.network/v1/auth/web3/nonce`
    );

    const nonceResponse = await res.data.nonce;
    console.log("Nonce Response: " + nonceResponse);

    return nonceResponse;
  };


  const createSiweMessage = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const nonceResponse = await getNonce();
    const statementString = 'Spheron Web3 Auth - Sign in with Ethereum to the app.';
    const addressString = signer.address;

    console.log("Provider: " + provider);
    console.log("Address: " + addressString);
    console.log("Signer: " + signer);

    console.log("Domain: " + window.location.host);
    console.log("Origin: " + window.location.origin);
    console.log("Nonce: " + nonceResponse);

    const domainString = window.location.host;
    const originString = window.location.origin;

    const message  = new SiweMessage({
      domain: window.location.host,
      address: addressString,
      statement: statementString,
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce: nonceResponse
    });

    const siweMessage:string = message.prepareMessage();

    console.log("message: " + siweMessage);
    let signature = await signer.signMessage(siweMessage);
    console.log("signature: " + signature);

    const type: string = 'signup';
    const referralCode = '';

    const url = `https://api-dev.spheron.network/v1/auth/web3/callback?state=${type}&address=${addressString}
    &message=${JSON.stringify(siweMessage)}
    &signature=${JSON.stringify(signature)}
    &referralCode=${referralCode}`;

    console.log(url);

    const responseToken = await axios.post(url);

    console.log(responseToken.status);
    console.log(responseToken.data);

  };

  const handleConnectWallet = async () => {
    const { ethereum } = window;
    setIsLoading(true);

    console.log(ethereum);

    if (typeof ethereum !== 'undefined') {
      useStore.setState({ errorMessage: false });
      try {
        const [accountAddress] = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        useStore.setState({isAuthenticated: true});
        useStore.setState({ walletConnectionAttempted: true });
        setIsLoading(false);
      } catch {
        useStore.setState({ walletConnectionAttempted: true });
        setIsLoading(false);
      }
    } else {
      useStore.setState({ errorMessage: true });
    }
    setIsLoading(false);
  };
  const handleBackButtonClick = () => {
    useStore.setState({ walletConnectionAttempted: false });
    useStore.setState({ isAuthenticated: false });
  };
  const handleSuccessButtonClick = async () => {

    await createSiweMessage();

    const jsConfetti = new JSConfetti();
    //jsConfetti.addConfetti({
    //  emojis: ['🚀', '🔥'],
      // confettiNumber: 100,
    //});
  };

  if (isLoading) {
    return (
      <button disabled className={styles.buttonLoading}>
        <LoadingSpinner />
      </button>
    );
  }

  if (walletConnectionAttempted) {
    if (isAuthenticated) {
      return (
        <button onClick={handleSuccessButtonClick} className={styles.button}>
          Sign-in with Ethereum
        </button>
      );
    }
    return (
      <button onClick={handleBackButtonClick} className={styles.button}>
        Back
      </button>
    );
  }
  return (
    <button onClick={handleConnectWallet} className={styles.buttonPrimary}>
      Connect Wallet
    </button>
  );
};

export default Button;
