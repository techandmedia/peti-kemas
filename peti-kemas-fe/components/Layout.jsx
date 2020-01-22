import { useContext } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { MenuContext } from 'utils/context/Global-Context';
import Modal from 'components/modal';
import Link from 'next/link';

import Pendaftaran from '../modules/pendaftaran';
import 'utils/styles/index.css';
import 'utils/styles/ant-override.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function CustomLayout(props) {
  const { isUserLoggedIn } = props;
  const { modal, dispatchModal } = useContext(MenuContext);
  const Sidebar = () => isUserLoggedIn && <SideMenu />;

  function handleMenu(e) {
    // console.log(e.item.props.name);
    const key = e.key;
    const name = e.item.props.name;
    if (key === 'daftar') {
      dispatchModal({ type: 'success', results: { title: name } });
    }
  }

  return (
    <Layout>
      <Modal modal={modal} dispatchModal={dispatchModal}>
        <Pendaftaran />
      </Modal>

      <Header className='header'>
        <div className='logo' />
        <Menu
          mode='horizontal'
          defaultSelectedKeys={['2']}
          onClick={handleMenu}
          /**
           * Pastikan lineHeigth ini sama dengan heigth di override css
           */
          style={{ lineHeight: '48px' }}>
          <Menu.Item key='home'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </Menu.Item>

          {/* Yang deklarasi di awal, maka component itu lah yang akan mulai *
           * Dalam hal ini, admin akan dirender paling kanan (float right)
           */}
          <Menu.Item key='admin' style={{ float: 'right' }}>
            <Link href='/admin'>
              <a>Admin</a>
            </Link>
          </Menu.Item>

          <Menu.Item key='contact' style={{ float: 'right' }}>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
          </Menu.Item>

          <Menu.Item
            key='daftar'
            name='Pendaftaran Perbaikan Peti Kemas'
            style={{ float: 'right' }}>
            <Button type='primary'>Daftar</Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sidebar />
        <Layout
        // style={{ padding: '0 24px 24px' }}
        >
          <Content
            style={{
              background: '#fff',
              padding: 12,
              marginTop: 6,
              minHeight: 380,
            }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

function SideMenu() {
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}>
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='user' />
              subnav 1
            </span>
          }>
          <Menu.Item key='1'>option1</Menu.Item>
          <Menu.Item key='2'>option2</Menu.Item>
          <Menu.Item key='3'>option3</Menu.Item>
          <Menu.Item key='4'>option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          title={
            <span>
              <Icon type='laptop' />
              subnav 2
            </span>
          }>
          <Menu.Item key='5'>option5</Menu.Item>
          <Menu.Item key='6'>option6</Menu.Item>
          <Menu.Item key='7'>option7</Menu.Item>
          <Menu.Item key='8'>option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          title={
            <span>
              <Icon type='notification' />
              subnav 3
            </span>
          }>
          <Menu.Item key='9'>option9</Menu.Item>
          <Menu.Item key='10'>option10</Menu.Item>
          <Menu.Item key='11'>option11</Menu.Item>
          <Menu.Item key='12'>option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
