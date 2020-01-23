import { useContext } from 'react';
import { Layout, Menu, Icon, Button, Typography } from 'antd';
import { MenuContext } from 'utils/context/Global-Context';
import Modal from 'components/modal';
import Link from 'next/link';

import Pendaftaran from '../modules/pendaftaran';
import 'utils/styles/index.css';
import 'utils/styles/ant-override.css';

const { Title } = Typography;
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
              <a>
                <Title className='title' level={3}>
                  CV. BMC
                </Title>
              </a>
            </Link>
          </Menu.Item>

          {/* Yang deklarasi di awal, maka component itu lah yang akan mulai *
           * Dalam hal ini, admin akan dirender paling kanan (float right)
           */}
          <Menu.Item key='admin' style={{ float: 'right' }}>
            <Link href='/auth/admin'>
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
        <Layout>
          <Sidebar />
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
        // defaultSelectedKeys={['perbaikan']}
        // defaultOpenKeys={['main-menu']}
        style={{ height: '100%', borderRight: 0 }}>
        <SubMenu
          key='main-menu'
          title={
            <span>
              <Icon type='user' />
              Pelanggan
            </span>
          }>
          <Menu.Item key='perbaikan'>
            <Link href='/dashboard/perbaikan'>
              <a>Perbaikan</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='laporan'
          title={
            <span>
              <Icon type='laptop' />
              Laporan
            </span>
          }>
          <Menu.Item key='pembayaran'>
            <Link href='/dashboard/laporan-pembayaran'>
              <a>Pembayaran</a>
            </Link>
          </Menu.Item>
          <Menu.Item key='pelanggan'>
            <Link href='/dashboard/laporan-pelanggan'>
              <a>Pelanggan</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='logout'>
          <a>Logout</a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
