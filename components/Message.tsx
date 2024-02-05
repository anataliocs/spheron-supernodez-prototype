import useStore from '../helpers/store';
import styles from '../styles/Message.module.css';

interface MessageBoxProps {
  title: string;
  errorState?: boolean;
  children: React.ReactNode;
}

const MessageBox = ({ title, errorState, solCollectibleArray, children }: MessageBoxProps) => {
  return (
    <div
      className={`${styles.outerBox} ${errorState ? 'bg-gradient-border-error-to-t' : 'bg-gradient-border-to-t'
        }`}
    >
      <div
        className={`${styles.innerBox} ${errorState
          ? 'bg-gradient-border-error-to-b'
          : 'bg-gradient-border-to-b'
          }`}
      >
        <h1 className={`${styles.title} ${errorState ? 'text-primary' : ''}`}>
          {title}
        </h1>
        {solCollectibleArray ? (
          solCollectibleArray.map(nft =>
          (
            <div className={styles.accessBox}>
              <span><h5>Let's deploy a node! </h5><strong>{nft.name}</strong></span>
            </div>
          )
          )) : null
        }
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};

const Message = () => {
  const walletConnectionAttempted = useStore(
    (state) => state.walletConnectionAttempted
  );
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (walletConnectionAttempted) {
    if (isAuthenticated) {
      return (
        <MessageBox title="Logged in with Web3 Wallet!" errorState={false} >
        </MessageBox>
      );
    }
    return (
      <MessageBox title="Access Denied" errorState={true}>
        <p>
          Test
        </p>
      </MessageBox>
    );
  }
  return (
    <MessageBox title="Spheron Supernodez">
      <span>
        Deploy nodes in a click with <span className="font-normal">Spheron Supernodez</span>, no technical experience needed!
      </span>
    </MessageBox>
  );
};

export default Message;
