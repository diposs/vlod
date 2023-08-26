import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function PasswordRequirement (password: string) {
  if (password=='goat') {
     const result = password.replace(/\s/g, '');
    return (
    <p>fgdd</p>
  );
  } else{
    const result = password.replace(/\s/g, '');
    return (
    <p>{result}</p>
  );
  }
}

export function SearchPage() {
  const router = useRouter();
  const [data, setData] = useState('goat');
  const result = data.replace(/\s/g, '');
  useEffect(() => {
    if (typeof router.query.address === 'string') {
         setData(router.query.address);
    }
  },[router.query.address])
    return (
        <Center h= '97dvh'>
            <PasswordRequirement password ={data}/>
        </Center>
    );
}
