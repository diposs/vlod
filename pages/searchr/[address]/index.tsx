import { useRouter } from 'next/router'
import {FirstHeader} from '../../../components/header/header1';


export default function Searchresult ({ data }:{data?: string | string[] | undefined;}) {
  console.log(data);
    return (
      <>
      <FirstHeader/>
      </>
    );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const router = useRouter();
  const data = router.query;

  console.log(data);
  // Pass data to the page via props
  return null;
}
