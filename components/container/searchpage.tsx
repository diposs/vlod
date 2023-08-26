import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function SearchPage() {
  const router = useRouter();
  var pd = 'goat';
  useEffect(() => {
    if (typeof router.query.address === 'string') {
        var pd = router.query.address;
    }
  },[router.query.address])
    return (
        <Center h= '97dvh'>
            <p>{pd}</p>
        </Center>
    );
}
