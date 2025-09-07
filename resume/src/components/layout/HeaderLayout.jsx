import { Layout, Menu } from "antd"
import { Header } from "antd/es/layout/layout";

function HeaderLayout() {
  const items = [
    {
      key: '1',
      label: 'Home',
    },
    {
      key: '2',
      label: 'About',
    },
    {
      key: '3',
      label: 'Contact',
    },
  ]

  return(
    <Layout>
      <Header className="flex align-center">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}>

        </Menu>
      </Header>
    </Layout>
  )
}

export default HeaderLayout