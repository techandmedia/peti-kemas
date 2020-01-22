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
        console.log('Received values of form: ', values, this.props.imgPath);
        this.props.postDaftar('pendaftaran', {
          type: 'create-pendaftaran',
          nik: values.nik,
          nama_lengkap: values.nama_lengkap,
          nama_perusahaan: values.nama_perusahaan,
          alamat_lengkap: values.alamat_lengkap,
          nomor_telepon: values.nomor_telepon,
          email: values.email,
          bukti_bayar_dp: this.props.imgPath,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handlePendaftaran}>
        {formFields.map(form => {
          if (form.field === 'nik') {
            return (
              <Form.Item
                key={form.label}
                label='Nomor KTP'
                style={{ marginBottom: '0px' }}>
                {getFieldDecorator(form.field, {
                  initialValue: form.initialValue,
                  rules: form.rules,
                })(<Input />)}
              </Form.Item>
            );
          }
          return (
            <Form.Item
              key={form.label}
              label={form.label}
              style={{ marginBottom: '0px', textTransform: 'capitalize' }}>
              {getFieldDecorator(form.field, {
                initialValue: form.initialValue,
                rules: form.rules,
              })(<Input />)}
            </Form.Item>
          );
        })}

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Daftar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
