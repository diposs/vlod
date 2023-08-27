import { Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {useEvmWalletNFTs} from '@moralisweb3/next';

function Glue ({dass}:{dass:string}){
	const { fetch } = useEvmWalletNFTs(undefined, {
    revalidateOnMount: false,
  });
	const [validate, setValidate] = useState<string>('');
	const [itemed, setItemed] = useState(null);
	const router = useRouter();
  useEffect(() => {
    if (typeof router.query.address === 'string') {
         setValidate('');
    }
  },[router.query.address]);
	const fetchData2 =  async() => {
		const allNFTs = [];
		if(validate == ''){
		const chains = ["0x1", "0x89", "0xa4b1"]
		for (const chaind of chains) {
		const responsed =  await fetch ({chain: chaind, format: 'decimal', mediaItems: true, address: dass});
		allNFTs.push(responsed);
		}
		setValidate(JSON.stringify(allNFTs)||'');
		console.log(allNFTs);
		}
      }

	  
      // handle the error as needed
      fetchData2().catch((e) => {
      console.error('An error occurred while fetching the data: ', e);
    })
	return null

      
	
}
function PasswordRequirement ({ password }: { password: string }) {
  var shrink = password.replace(/\s/g, '');
  var para = password.toLocaleLowerCase();
  let vault = shrink.toLocaleLowerCase();
  var result =  vault.endsWith(".eth");
  var result2 = /(\b0x[a-f0-9]{40}\b)/g.test(para);
  if (result==true) {
    const [datae, setDatae] = useState('')
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
		const fetchData = async () => {
        const response = await fetch("/api/ensck", {
		method: 'POST',
		body: vault,
		});
        var datad = await response.json();
        setDatae(datad.name);
        setLoading(false);
		
      }
      fetchData().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e);
    })
      
  }, [vault])
  if (isLoading) return <p>Loading...</p>
  if (!datae) return <p>No profile data</p>
  if (/(\b0x[a-f0-9]{40}\b)/g.test(datae.toLocaleLowerCase()) ==true && datae != null){
	return (
	  <>
    <p>{datae}</p>
	<Glue dass = {datae}/>
	</>
  );
  }else{
      return (
    <p>{datae}</p>
  );
  }
  } 
  if(result2 == true && result == false){
    var resp = para.match(/(\b0x[a-f0-9]{40}\b)/g);
    if (resp != null){
      const resulted = resp[0] || 'goat';
	  
    return (
      <>
    <p>{resulted}</p>
    <p>eth address</p>
	<Glue dass = {resulted}/>;
        </>
  );
    } else{
      <p> ERR WITH SEARCH QUERY TRY AGAIN</p>
    }
    
  } else{
    return (
    <p>{shrink}</p>
  );
}
}

export function Searchpage () {
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
};
