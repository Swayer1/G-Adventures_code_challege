import { Layout, Breadcrumb } from 'antd';

import React from 'react';

import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/" >Destinations</Link></Breadcrumb.Item>
        </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {props.children}
          </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Code challege 2019</Footer>
    </Layout>
  );
}
export default CustomLayout;
