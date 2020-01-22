import { Form, Icon, Input, Button, Col, Row, Typography, Divider } from 'antd';

const { Title } = Typography;

export default class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.postLogin('auth', {
          type: 'signin',
          username: values.username,
          password: values.password,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type='flex' justify='center'>
        <Col span={12}>
          <Title level={4} style={{ textAlign: 'center' }}>
            Staf CV. BMC Login
          </Title>
          <Divider />

          {/* <Row type="flex" justify="center"> */}
          <Form
            onSubmit={this.handleSubmit}
            className='login-form'
            style={{ marginLeft: '28%' }}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Username'
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  placeholder='Password'
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'>
                Log in
              </Button>
            </Form.Item>
          </Form>
          {/* </Row> */}
        </Col>
      </Row>
    );
  }
}
