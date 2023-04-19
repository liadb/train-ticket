import React, { useState } from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css'
import TicketGraph from "./TicketGraph";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Train graph', '1', <PieChartOutlined />),
  getItem('Stations', '2', <DesktopOutlined />),
  getItem('More', 'sub1', <UserOutlined />, [
    getItem('Settings', '3'),
    getItem('About', '4'),
    getItem('Help', '5'),
  ]),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Train Ticket Graph</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <TicketGraph />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Train Ticket ©2023 Created by liadb</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
