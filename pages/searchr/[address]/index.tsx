import { useRouter } from 'next/router'
import {FirstHeader} from '../../../components/header/header1';


export default function Searchresult ({ data }) {
  console.log(data);
    return (
      <>
      <FirstHeader/>
      </>
    );
};
export default Searchresult;

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const router = useRouter();
  const data = await router.query()
 
  // Pass data to the page via props
  return { props: { data } }
}
