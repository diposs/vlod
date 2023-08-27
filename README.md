This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Vlod

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Features


-  Generative Ai api access.
-  ENS use for address search and login banner.
-  NFT marketplace
-  NFT search engine via address or ENS
-  Promt base NFT image generation
-  Polybase for easier retrival of minted NFT


## Folders and Feature


- Smart contract written in Solidity. [Click here](https://github.com/diposs/vlod/blob/main/public/Contracts/)
- Smart contract deployment script. [Click here](https://github.com/diposs/vlod/blob/main/public/script/)
- Local api for ENS checker for search engine feature. [Click here](https://github.com/diposs/vlod/blob/main/pages/api/ensck.ts)
- Local api for ENS resolver for login banner. [Click here](https://github.com/diposs/vlod/blob/main/pages/api/ensnm.ts)
- api for Promt based generative Ai images. [Click here](https://github.com/diposs/vlod/blob/main/pages/api/gen.ts)
- Login feature for email with wallet encryption [Click here](https://github.com/diposs/vlod/blob/main/components/container/HeaderContainer.tsx)
- Search engine feature using ENS and Moralis.io [Click here](https://github.com/diposs/vlod/blob/main/components/container/searchresult.tsx)

## Images


-  Example of the Ai generated image
<img src='./public/example.png' alt='lurking Darkness' />


## Future Plans

Here are some upcoming feature we will be adding post hackathon :

1) Push Group Chat - 
We want to add a group chat functionality in every NFT page, where users can discuss on topics related to that particular NFT or NFT collection.
2) Token Bridging -
Users can bridge their tokens from one chain to another from our marketplace itself, we will be using connext xcalls for this functionality.


## Personal Regret 
I started the hackathon on thursday. I had so many plans but with only 2 days to go they were too much to achieve. 
