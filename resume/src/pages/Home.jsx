import { Layout, Menu } from 'antd';
import HeaderLayout from '../components/layout/HeaderLayout';
import Profile from '../components/layout/Profile';


function Home() {
  return (
    <div className='h-full w-full'>
      <HeaderLayout></HeaderLayout>
      <Profile className="h-2/3"></Profile>
    </div>
  );
}
export default Home;