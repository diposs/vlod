import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function SearchPage() {
  const router = useRouter()
  useEffect(() => {
    if (typeof router.query.address === 'string') {
        const pd = router.query.address;
    }
  },[router.query.address])
    return (
        <Center h= '97dvh'>
            <p>{pd || 'goat'}</p>
        </Center>
    );
}
