import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProviderCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    if (token) {
      localStorage.setItem('jwt-token', token || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    router.push('/');
  }, []);

  return <div>Loading...</div>;
};

export default ProviderCallback;
