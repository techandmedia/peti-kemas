import { Form, Input, Button, InputNumber } from 'antd';
import {
  formItemLayout,
  tailFormItemLayout,
} from 'components/form-item-layout';
import formRecords from './form-fields';

export default class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handlePendaftaran = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values, this.props.imgPath);
        console.log(
          'Received values of form: ',
          values.jumlah_dp,
          typeof values.jumlah_dp,
        );
        /**
         * Hanya jika sudah upload DP, baru bisa daftar
         */
        if (this.props.imgPath) {
          this.props.postDaftar('pendaftaran', {
            type: 'create-pendaftaran',
            nik: values.nik,
            nama_lengkap: values.nama_lengkap,
            nama_perusahaan: values.nama_perusahaan,
            alamat_lengkap: values.alamat_lengkap,
            nomor_telepon: values.nomor_telepon,
            email: values.email,
            jumlah_peti_kemas: parseInt(values.jumlah_peti_kemas),
            jumlah_dp: values.jumlah_dp,
            bukti_bayar_dp: this.props.imgPath,
          });
        } else {
          this.props.dispatchModal({
            type: 'error',
            results: {
              title: 'UPLOAD ERROR',
              message: 'Anda belum melakukan upload bukti DP',
            },
          });
        }
      }
    });
  };

  onChange = value => {
    console.log('changed', value);
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

          if (form.field === 'jumlah_dp') {
            return (
              <Form.Item key={form.label} label='Jumlah DP'>
                {getFieldDecorator(form.field, {
                  initialValue: null,
                  rules: form.rules,
                })(
                  <InputNumber
                    formatter={value =>
                      `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value => value.replace(/\Rp\s?|(,*)/g, '')}
                    onChange={this.onChange}
                  />,
                )}
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
            Daftar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
