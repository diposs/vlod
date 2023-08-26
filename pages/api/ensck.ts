import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from "ethers";
type Data = {
  name: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>){
  const data = req.body
  console.log(data);
  var url = 'https://eth-mainnet.blastapi.io/275cbdc6-c032-4075-8897-cc50b0db3fd5';
  var provider =  await new ethers.providers.JsonRpcProvider(url);
  const resolver = await provider.getResolver(data.toString());
  var reclaim = 'Failed to Load';
  if (resolver != null){
      var reclaim =  await resolver.getAddress() || 'error';
  }else{
   var reclaim =  'Invalid ENS Address';
    }
  res.status(200).json({ name: reclaim });
}
