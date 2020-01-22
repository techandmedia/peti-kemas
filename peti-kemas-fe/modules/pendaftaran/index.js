import { useState, useEffect } from "react";
import { Form } from "antd";
import Modal, { useModal } from 'components/modal';
import usePostData from 'utils/api/usePostData';
import Pendaftaran from "./Pendaftaran";
import BuktiBayar from "./BuktiBayar";

const FormPendaftaran = Form.create({ name: "register" })(Pendaftaran);
const FormBuktiBayar = Form.create({ name: "bayar" })(BuktiBayar);

export default function Index() {
  const [daftar, postDaftar] = usePostData('', '');
  const [modal, dispatchModal] = useModal();
  const [imgPath, setPath] = useState("");

  useEffect(() => {
    const { isLoading, isError, code } = daftar;
    console.log('daftar', daftar);
    if (!isLoading && code >= 200 && code < 300) {
      dispatchModal({ type: 'success', results: daftar });
    }

    if (!isLoading && isError && code >= 300) {
      dispatchModal({ type: 'error', results: daftar });
    }
  }, [daftar]);

  return (
    <React.Fragment>
      <Modal modal={modal} dispatchModal={dispatchModal} />
      <FormPendaftaran imgPath={imgPath} postDaftar={postDaftar} />
      <FormBuktiBayar imgPath={imgPath} setPath={setPath} />
    </React.Fragment>
  );
}