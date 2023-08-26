import {FirstHeader} from '../../../components/header/header1';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Etherchecker =  async(dadd:string) => {
  const response = await fetch('/api/ensck.ts', {
      method: 'POST',
      body: dadd,
    })
  const data = await response
      return (
    <p>{data}</p>
  );
    
}
function PasswordRequirement ({ password }: { password: string }) {
  var shrink = password.replace(/\s/g, '');
  var para = password.toLocaleLowerCase();
  let vault = shrink.toLocaleLowerCase();
  var result =  vault.endsWith(".eth");
  var result2 = /(\b0x[a-f0-9]{40}\b)/g.test(para);
  if (result==true) {
    console.log('ddoings');
    return (
    <Etherchecker dadd = {vault} />
      );
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
export default function Searchresult () {
    const router = useRouter();
  const [data, setData] = useState('');
  const result = data.replace(/\s/g, '');
  useEffect(() => {
    if (typeof router.query.address === 'string') {
         setData(router.query.address);
    }
  },[router.query.address])
    return (
      <>
          <FirstHeader/>
          <Center h= '97dvh'>
            <PasswordRequirement password ={data}/>
        </Center>
      </>
    );
};



