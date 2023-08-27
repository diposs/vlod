import {FirstHeader} from '../../../components/header/header1';
import {Searchpage} from '../../../components/container/searchresult';
import type { NextApiRequest, NextApiResponse } from 'next';
export default function Searchresult () {
    return (
      <>
          <FirstHeader/>
          <Searchpage />
      </>
    );
};



