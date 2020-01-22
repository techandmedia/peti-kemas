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
  const [buktiBayarTertulis, postBuktiBayarTertulis] = usePostData('', '');
  const [modal, dispatchModal] = useModal();
  const { getFieldDecorator, validateFieldsAndScroll } = props.form;
  const [file, setFile] = useState(null);

  useEffect(() => {
    const { isLoading, isError, code } = buktiBayarTertulis;
    // console.log('buktibayartertulis', path);
    if (!isLoading && code >= 200 && code < 300) {
      const path = buktiBayarTertulis.data.filename;
      props.setPath(path);
      dispatchModal({ type: 'success', results: buktiBayarTertulis });
    }

    if (!isLoading && isError && code >= 300) {
      dispatchModal({ type: 'error', results: buktiBayarTertulis });
    }
  }, [buktiBayarTertulis]);

  function onChange(e) {
    // console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      // if (!err) {
      //   postBuktiBayarTertulis(
      //     'files/upload-bukti-bayar/tertulis',
      //     file,
      //     'file',
      //     'bukti-bayar-tertulis',
      //   );
      // }
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
              src={`http://localhost:3001/files/bukti-bayar-tertulis/${props.imgPath}`}
            />
          }>
          <Meta title='Europe Street beat' description='www.instagram.com' />
        </Card>
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

        <Form.Item {...tailFormItemLayout}>
          <Button type='danger' htmlType='submit' icon='upload'>
            Upload DP
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
