import { ethers } from 'ethers';

export const getSigner = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { signer, address };
};
