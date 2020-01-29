import { Form, Input, Button } from 'antd';
import {
  formItemLayout,
  tailFormItemLayout,
} from 'components/form-item-layout';
import formRecords from './form-fields';

class PemberianNomorAntrian extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handlePendaftaran = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, this.props);
        /**
         * Hanya jika sudah upload DP, baru bisa daftar
         */

        this.props.updatePendaftaran('pendaftaran', {
          type: 'update-pendaftaran',
          email: values.email,
          nomor_antrian: values.nomor_antrian,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { ID, records } = this.props;
    const formFields = formRecords(records);

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

          if (ID === 'pendaftaran' && form.field === 'nomor_antrian') {
            return null;
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
            Simpan
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const FormPerbaikan = Form.create({ name: 'antrian' })(PemberianNomorAntrian);

export default FormPerbaikan;
