import { List, Avatar } from 'antd';

import React from 'react';

const Articles = (props) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
        },
        pageSize: 4,
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon="arrow-right" />}
            title={<a href={`${item.id}`}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
}

export default Articles;
