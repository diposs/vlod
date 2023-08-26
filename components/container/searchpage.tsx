import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

function PasswordRequirement ({ password }: { password: string }) {
  var shrink = password.replace(/\s/g, '');
  var para = password.toLocaleLowerCase();
  let vault = shrink.toLocaleLowerCase();
  var result =  vault.endsWith(".eth");
  var result2 = /(\b0x[a-f0-9]{40}\b)/g.test(para);
  if (result==true) {
    var url = 'https://eth-mainnet.blastapi.io/275cbdc6-c032-4075-8897-cc50b0db3fd5';
    var provider =  new ethers.providers.JsonRpcProvider(url);
    const resolver =  provider.getResolver(vault);
    if (resolver != null){
      const reclaim =  resolver.?getAddress();
      return (
    <p>{reclaim}</p>
  );
    }else{
      return (
    <p>Invalid ENS Address</p>
  );
    }
  } 
  if(result2 == true && result == false){
    var resp = para.match(/(\b0x[a-f0-9]{40}\b)/g);
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
