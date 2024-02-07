import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useStore from '../helpers/store';
import Button from '../components/Button';
import SpheronLogo from '../components/icons/SpheronLogo';
import Message from '../components/Message';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/icons/LoadingSpinner';
import { SiweMessage } from 'siwe';

const Home: NextPage = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const walletAddress = useStore((state) => state.walletAddress);
  const errorMessage = useStore((state) => state.errorMessage);
  const [isLoading, setIsLoading] = useState(false);

  // check if wallet has already been connected and set isAuthenticated accordingly
  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      let user: any;
      (async () => {
        const res = await axios.get(`http://localhost:8080/v1/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.user);
        user = res.data.user;

        // (async () => {
        //   const orgRes = await axios.post(
        //     `http://localhost:8080/v1/organization/`,
        //     {
        //       name: user.platformProfile.name,
        //       username: user.platformProfile.username,
        //       image: '',
        //       preferedAppType: 'compute',
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );
        //   console.log(orgRes);
        // })();

        const orgId = user.organizations[0].compute._id;
        console.log(orgId);
        (async () => {
          const orgRes = await axios.get(
            `http://localhost:8080/v1/organization/${orgId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(orgRes.data);
        })();

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // (async () => {
        //   const accessRes = await axios.post(
        //     `http://localhost:8080/v1/api-keys/`,
        //     {
        //       name: 'tg-bot',
        //       organizationId: orgId,
        //       expiresAt: tomorrow,
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );
        //   console.log(accessRes.data.value);
        // })();

        (async () => {
          const accessRes = await axios.get(
            `http://localhost:8080/v1/api-keys`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(accessRes.data.apiKeys);
        })();
      })();
    }

    // let web3: any;
    // const { ethereum } = window;
    // const handleAccountChanged = (accounts: string[] | null | undefined) => {
    //   if (Array.isArray(accounts)) {
    //     const [account] = accounts;
    //     if (account) {
    //       setIsLoading(true);
    //       signInWithEthereum();
    //     } else {
    //       window.location.reload();
    //     }
    //   } else {
    //     window.location.reload();
    //   }
    // };
    // const domain = window.location.host;
    // const origin = window.location.origin;
    // const createSiweMessage = async (address: string, statement: string) => {
    //   const res = await axios.post(
    //     `https://api-dev.spheron.network/v1/auth/web3/nonce`
    //   );
    //   console.log(res);
    //   const message = new SiweMessage({
    //     domain,
    //     address,
    //     statement,
    //     uri: origin,
    //     version: '1',
    //     chainId: 1,
    //     nonce: await res.data,
    //   });
    //   return message.prepareMessage();
    // };
    // const signInWithEthereum = async () => {
    //   try {
    //     const [accountAddress] = await web3.eth.getAccounts();
    //     if (!accountAddress) {
    //       throw new Error('No accounts have been authorized by MetaMask');
    //     }
    //     let message = null;
    //     let signature = null;
    //     const signer = await web3.givenProvider;
    //     message = await createSiweMessage(
    //       await signer.address,
    //       'Sign in with Ethereum to the app.'
    //     );
    //     console.log(message);
    //     signature = await signer.signMessage(message);
    //     console.log(signature);
    //     const { data } = await axios.post('/api/auth', { accountAddress });
    //     useStore.setState({ isAuthenticated: data.isAuthenticated });
    //     useStore.setState({ walletConnectionAttempted: true });
    //     useStore.setState({ walletAddress: accountAddress });
    //   } catch (error) {
    //     useStore.setState({ isAuthenticated: false });
    //     useStore.setState({ walletConnectionAttempted: false });
    //   }
    //   setIsLoading(false);
    // };
    // if (typeof ethereum !== 'undefined') {
    //   // web3 = new Web3(Web3.givenProvider);
    //   window.ethereum.on('accountsChanged', handleAccountChanged);
    //   useStore.setState({ errorMessage: false });
    //   signInWithEthereum();
    // } else {
    //   // show error state for when metamask isn't installed
    //   setIsLoading(false);
    //   useStore.setState({ errorMessage: true });
    // }
    // return () => {
    //   if (typeof ethereum !== 'undefined') {
    //     window.ethereum.removeListener('accountsChanged', handleAccountChanged);
    //   }
    // };
  }, []);

  const mainContent = () => {
    return (
      <>
        <Message />
        <Button />
        {errorMessage && (
          <p className={styles.errorMessage}>
            We couldn't detect your wallet. Please click{' '}
            <a
              href="https://metamask.io"
              target="blank"
              className="underline underline-offset-1"
            >
              here
            </a>{' '}
            to download the MetaMask extension and set up a wallet.
          </p>
        )}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Spheron Supernodez</title>
        <meta name="description" content="Deploy your node with Spheron" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.container} ${
          walletConnectionAttempted && isAuthenticated ? styles.noblur : ''
        }`}
      >
        <header>
          <div className={styles.logo}>
            <SpheronLogo className="h-9" />
          </div>
          {walletAddress && (
            <div className={styles.address}>{`${walletAddress.substring(
              0,
              5
            )}...${walletAddress.substring(
              walletAddress.length - 5,
              walletAddress.length
            )}`}</div>
          )}
        </header>
        <main className={styles.main}>
          {isLoading ? <LoadingSpinner /> : mainContent()}
        </main>
      </div>
    </>
  );
};

export default Home;
