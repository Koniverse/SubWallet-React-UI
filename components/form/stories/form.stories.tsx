import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Form from '..';
import Input from '../../input';
import Button from '../../button';
import type { ValidateStatus } from '../FormItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Form Demo',
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Form>;

type SubmitResponse = {
  status?: ValidateStatus;
  message?: string;
};

const App = () => {
  const [{ status: responseStatus, message: responseMessage }, setSubmitResponse] =
    useState<SubmitResponse>({});

  const onFinish = (values: any) => {
    console.log('Form values:', values);

    if (values.username === 'username' && values.password === 'username') {
      setSubmitResponse({
        status: 'success',
        message: 'Validation Successfully!',
      });
    } else {
      setSubmitResponse({
        status: 'error',
        message: 'User name or password is invalid!',
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onInputChange = () => {
    setSubmitResponse({});
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        validateStatus={responseStatus}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input
          label="Username"
          placeholder="Your username"
          onChange={onInputChange}
          displaySuccessStatus={responseStatus === 'success'}
        />
      </Form.Item>

      <Form.Item
        validateStatus={responseStatus}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          label="Password"
          placeholder="Your password"
          onChange={onInputChange}
          displaySuccessStatus={responseStatus === 'success'}
        />
      </Form.Item>

      <Form.Item validateStatus={responseStatus} help={responseMessage} />

      <Form.Item>
        <Button htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Form> = () => <App />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
