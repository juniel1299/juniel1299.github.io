import { Layout, Menu } from 'antd';
import HeaderLayout from '../components/layout/HeaderLayout';
import Introduce from '../components/layout/Introduce';

function Home() {
  return (
    <div className='h-full w-full'>
      <HeaderLayout></HeaderLayout>
      <Introduce className="h-2/3"></Introduce>
    </div>
  );
}
export default Home;