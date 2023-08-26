import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function PasswordRequirement ({ password }: { password: string }) {
  var shrink = password.replace(/\s/g, '')
  var result =  shrink.endsWith(".eth");
  var result2 = /(\b0x[a-f0-9]{40}\b)/g.test(shrink);
  if (result==true) {
    return (
    <p>ens</p>
  );
  } 
  if(result2 == true && result == false){
    var resp = shrink.match(/(\b0x[a-f0-9]{40}\b)/g);
    if (resp != null){
      const resulted = resp[0] || 'goat';
    console.log(resp);
    return (
      <>
    <p>{resulted}</p>
    <p>eth address</p>
        </>
  );
    } else{
      <p> ERR WITH SEARCH QUERY TRY AGAIN</p>
    }
    
  } else{
    return (
      <>
    <p>{shrink}</p>
    <p>vvgv</p>
        </>
  );
}
}
export function SearchPage() {
  const router = useRouter();
  const [data, setData] = useState('');
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
