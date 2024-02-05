
import create from 'zustand';

interface StoreState {
  walletConnectionAttempted: boolean;
  isAuthenticated: boolean;
  errorMessage?: boolean;
  walletAddress?: string;
}

const useStore = create<StoreState>(() => {
  return {
    walletConnectionAttempted: false,
    isAuthenticated: false,
  };
});

export default useStore;
