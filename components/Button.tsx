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
    console.log(signature);

    const { data } = await axios.post('/api/auth', {
      addressString, siweMessage, signature, nonceResponse
    });
  };

  const handleConnectWallet = async () => {
    const { ethereum } = window;
    setIsLoading(true);

    if (typeof ethereum !== 'undefined') {
      useStore.setState({ errorMessage: false });
      try {
        const [accountAddress] = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        const { data } = await axios.post('/api/auth', { accountAddress });
        useStore.setState({ isAuthenticated: data.isAuthenticated });
        useStore.setState({ walletConnectionAttempted: true });
        setIsLoading(false);
      } catch {
        useStore.setState({ isAuthenticated: false });
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
  const handleSuccessButtonClick = () => {

    createSiweMessage();

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['🚀', '🔥'],
      // confettiNumber: 100,
    });
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
          Let's Go
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
