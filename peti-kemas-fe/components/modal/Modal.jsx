import { useReducer } from 'react';
import { Modal } from 'antd';

function modalReducer(state, action) {
  // console.log(state);
  // console.log(action);
  const { type, results } = action;

  switch (type) {
    case 'success':
      // console.log(results);
      return {
        ...state,
        isModalVisible: true,
        modalTitle: results.title,
        modalMessage: results.message,
      };

    case 'error':
      // console.log('Result Modal', results);
      return {
        ...state,
        isModalVisible: true,
        modalTitle: results.title,
        modalMessage: results.message,
      };

    case 'modal-show':
      return { ...state, isModalVisible: true };

    case 'modal-ok':
      return {
        isModalVisible: false,
        modalTitle: '',
        modalMessage: '',
      };

    case 'modal-cancel':
      return {
        isModalVisible: false,
        modalTitle: '',
        modalMessage: '',
      };
    default:
      throw new Error();
  }
}

export function useModal() {
  const [modal, dispatchModal] = useReducer(modalReducer, {
    isModalVisible: false,
    modalTitle: '',
    modalMessage: '',
  });

  return [modal, dispatchModal];
}

export default function CustomModal(props) {
  const { modal, dispatchModal, children } = props;
  const { modalTitle, modalMessage, isModalVisible } = modal;
  // console.log('modal', modal);
  // console.log("modal", props);

  function handleOk() {
    dispatchModal({ type: 'modal-ok' });
  }

  function handleCancel() {
    dispatchModal({ type: 'modal-cancel' });
  }

  return (
    <Modal
      title={
        <div style={{ textTransform: 'capitalize', textAlign: 'center' }}>
          {modalTitle}
        </div>
      }
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}>
      <p>{modalMessage}</p>
      {children}
    </Modal>
  );
}
