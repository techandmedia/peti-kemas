import { Form, Input, Button } from 'antd';
import {
  formItemLayout,
  tailFormItemLayout,
} from 'components/form-item-layout';
import { formFields } from './form-fields';

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handlePendaftaran = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handlePendaftaran}>
        {formFields.map(form => (
          <Form.Item
            key={form.label}
            label={form.label}
            style={{ marginBottom: '0px', textTransform: 'capitalize' }}>
            {getFieldDecorator(form.field, {
              rules: form.rules,
            })(<Input />)}
          </Form.Item>
        ))}

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Daftar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
