import useStore from '../helpers/store';
import styles from '../styles/Message.module.css';

interface MessageBoxProps {
  title: string;
  errorState?: boolean;
  children?: React.ReactNode;
}

const MessageBox = ({ title, errorState, children }: MessageBoxProps) => {
  return (
    <div
      className={`${styles.outerBox} ${
        errorState ? 'bg-gradient-border-error-to-t' : 'bg-gradient-border-to-t'
      }`}
    >
      <div
        className={`${styles.innerBox} ${
          errorState
            ? 'bg-gradient-border-error-to-b'
            : 'bg-gradient-border-to-b'
        }`}
      >
        <h1 className={`${styles.title} ${errorState ? 'text-primary' : ''}`}>
          {title}
        </h1>

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
        <MessageBox
          title="Logged in with Web3 Wallet!"
          errorState={false}
        ></MessageBox>
      );
    }
    return (
      <MessageBox title="Access Denied" errorState={true}>
        <p>Test</p>
      </MessageBox>
    );
  }
  return (
    <MessageBox title="Supernodez">
      <span>
        Deploy nodes in a click with{' '}
        <span className="font-normal text-gray-200">Supernodez</span>, no
        technical experience needed!
        <p className="mt-4">
          <br />
          {/* <label>Email: </label> */}
          <input
            placeholder="name@email.com"
            className="shadow appearance-none border text-md rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </p>
      </span>
    </MessageBox>
  );
};

export default Message;
