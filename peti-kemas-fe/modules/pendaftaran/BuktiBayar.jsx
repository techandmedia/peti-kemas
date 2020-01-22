import { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Modal, { useModal } from 'components/modal';
import {
  formItemLayout,
  tailFormItemLayout,
} from 'components/form-item-layout';
import usePostData from 'utils/api/usePostData';

const { Meta } = Card;

export default function BuktiBerkas(props) {
  const [buktiBayarDP, postBayarDP] = usePostData('', '');
  const [modal, dispatchModal] = useModal();
  const { getFieldDecorator, validateFieldsAndScroll } = props.form;
  const [file, setFile] = useState(null);

  useEffect(() => {
    const { isLoading, isError, code } = buktiBayarDP;
    // console.log('buktiBayarDP', path);
    if (!isLoading && code >= 200 && code < 300) {
      const path = buktiBayarDP.data.filename;
      props.setPath(path);
      dispatchModal({ type: 'success', results: buktiBayarDP });
    }

    if (!isLoading && isError && code >= 300) {
      dispatchModal({ type: 'error', results: buktiBayarDP });
    }
  }, [buktiBayarDP]);

  function onChange(e) {
    // console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        postBayarDP(
          'files/upload-bukti-bayar/dp',
          file, // hasil extract, biasanya berupa file name
          'file', // key agar postData di API bisa membedakan mana yang file mana yang json
          'bukti-bayar-dp', // field yang diperlukan nestjs untuk intercept
        );
      }
    });
  }

  return (
    <React.Fragment>
      <Modal modal={modal} dispatchModal={dispatchModal}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt='example'
              src={`http://localhost:3001/files/bukti-bayar-dp/${props.imgPath}`}
            />
          }></Card>
      </Modal>
      <Form {...formItemLayout} onSubmit={onFormSubmit}>
        <Form.Item
          label='.'
          key='DP'
          style={{ color: 'white', marginBottom: '0px' }}>
          {getFieldDecorator(
            'upload',
            {},
          )(
            <span style={{ color: 'black' }}>
              Upload DP terlebih dahulu sebelum mendaftar
            </span>,
          )}
        </Form.Item>

        <Form.Item
          label='Bukti Bayar DP'
          key='Bukti Bayar DP'
          style={{ marginBottom: '0px' }}>
          {getFieldDecorator('bukti-bayar', {
            rules: [
              {
                required: true,
                message: 'Harap Upload Bukti Bayar DP!',
              },
            ],
          })(<Input type='file' key='Bukti Bayar DP' onChange={onChange} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={{ marginBottom: '0px' }}>
          <Button type='danger' htmlType='submit' icon='upload'>
            Upload DP
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
