import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function SearchPage() {
  const router = useRouter();
  const [data, setData] = useState('goat')
  useEffect(() => {
    if (typeof router.query.address === 'string') {
         setData(router.query.address);
    }
  },[router.query.address])
    return (
        <Center h= '97dvh'>
            <p>{data}</p>
        </Center>
    );
}
