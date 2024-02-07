import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import useStore from '../helpers/store';
import SpheronLogo from '../components/icons/SpheronLogo';
import Message from '../components/Message';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/icons/LoadingSpinner';
import SigninButton from '../components/SigninButton';
import SignupButton from '../components/SignupButton';
import { getSigner } from '../utils.ts/signer';

const Home: NextPage = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const walletAddress = useStore((state) => state.walletAddress);
  const errorMessage = useStore((state) => state.errorMessage);
  const [isLoading, setIsLoading] = useState(false);

  console.log(walletAddress);

  // check if wallet has already been connected and set isAuthenticated accordingly
  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      (async () => {
        const res = await axios.get(`http://localhost:8080/v1/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.user);

        useStore.setState({
          walletAddress: res.data.user.providerProfiles[0].id,
        });

        if (res.data.user.organizations) {
          const organizationExists = res.data.user.organizations.find(
            (org: any) =>
              org.profile.name === res.data.user.providerProfiles[0].id
          );
          if (!organizationExists) {
            (async () => {
              const orgRes = await axios.post(
                `http://localhost:8080/v1/organization/`,
                {
                  name: res.data.user.providerProfiles[0].id,
                  username: res.data.user.providerProfiles[0].id,
                  image: '',
                  preferedAppType: 'compute',
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log(orgRes);
            })();
          }
        } else {
          (async () => {
            const orgRes = await axios.post(
              `http://localhost:8080/v1/organization/`,
              {
                name: res.data.user.providerProfiles[0].id,
                username: res.data.user.providerProfiles[0].id,
                image: '',
                preferedAppType: 'compute',
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(orgRes);
          })();
        }
      })();
    }
  }, []);

  const mainContent = () => {
    return (
      <>
        <Message />
        {walletAddress ? (
          <div className="text-lg">
            Wallet Connected:{' '}
            {`${walletAddress.substring(0, 5)}...${walletAddress.substring(
              walletAddress.length - 5,
              walletAddress.length
            )}`}
          </div>
        ) : (
          <>
            <SigninButton />
            <SignupButton />
          </>
        )}

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
