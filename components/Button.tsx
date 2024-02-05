import { useState } from 'react';
import axios from 'axios';
import useStore from '../helpers/store';
import LoadingSpinner from './icons/LoadingSpinner';
import JSConfetti from 'js-confetti';
import styles from '../styles/Button.module.css';

const Button = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);

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
