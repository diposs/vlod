import { useRouter } from 'next/router'
import {FirstHeader} from '../../../../components/header/header1';


const Searchresult = () => {
  const router = useRouter();
  const profiledid = router.query

    return (
      <>
      <FirstHeader/>
      </>
    );
};
export default Searchresult;
