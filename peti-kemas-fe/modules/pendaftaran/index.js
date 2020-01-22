import {
  Form,
  Input,
  Button,
} from 'antd';
import { formFields } from './form-fields'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        {
          formFields.map(form =>
            <Form.Item key={form.label} label={form.label} style={{ marginBottom: "0px", textTransform: "capitalize" }}>
              {getFieldDecorator(form.field, {
                rules: form.rules,
              })(<Input />)}
            </Form.Item>)
        }

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Daftar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm