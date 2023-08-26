import {FirstHeader} from '../../../components/header/header1';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function PasswordRequirement ({ password }: { password: string }) {
  var shrink = password.replace(/\s/g, '');
  var para = password.toLocaleLowerCase();
  let vault = shrink.toLocaleLowerCase();
  var result =  vault.endsWith(".eth");
  var result2 = /(\b0x[a-f0-9]{40}\b)/g.test(para);
  if (result==true) {
    console.log('ddoings');
    const [data, setData] = useState('')
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      const response = fetch("/api/ensjs/", {
      method: 'POST',
      body: vault,
    })
 ;
        var prediction =  response.json();
        console.log(prediction)
      }, [vault])
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
      return (
    <p>{data}</p>
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



