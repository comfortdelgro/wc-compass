import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();

  useEffect(() => {
    router.push('/main.html');
  });

  return null;
}
