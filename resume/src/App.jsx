import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Page />} /> */}
      </Routes>
  );
}