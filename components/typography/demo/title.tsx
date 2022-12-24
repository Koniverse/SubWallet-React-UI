import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const App: React.FC = () => (
  <>
    <Title>h1. Ant Design</Title>
    <Title level={2}>h2. Ant Design</Title>
    <Title level={3}>h3. Ant Design</Title>
    <Title level={4}>h4. Ant Design</Title>
    <Title level={5}>h5. Ant Design</Title>
    <Title level={6}>h6. Ant Design</Title>

    <Title level={3} ellipsis style={{ maxWidth: '500px' }}>
      Ellipsis demo: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi deleniti,
      distinctio et in ipsum iusto nesciunt nihil odio officia quia quo, quod sed sint. Aperiam
      ducimus facere ipsum nobis vitae.
    </Title>
  </>
);

export default App;
