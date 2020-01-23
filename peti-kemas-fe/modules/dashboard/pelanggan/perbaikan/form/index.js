import { useState, useEffect, useContext } from "react";
import { StatusContext } from "utils/context/Global-Context";
import usePostData from "utils/api/usePostData";
import { Form } from "antd";
import Modal, { useModal } from "components/modal";
import Pendaftaran from "../../../../pendaftaran/Pendaftaran";

const FormPendaftaran = Form.create({ name: "register" })(Pendaftaran);

export default function Index({ records }) {
  const { setStatus } = useContext(StatusContext);
  const [daftar, postDaftar] = usePostData("", "");
  const [modal, dispatchModal] = useModal();
  const [imgPath, setPath] = useState("");

  useEffect(() => {
    const { isLoading, isError, code } = daftar;
    console.log("daftar", daftar);
    if (!isLoading && code >= 200 && code < 300) {
      /**
       * Kalau berhasil melakukan pendaftaran, status true
       * Supaya tabel bisa refresh
       */
      setStatus(true);
      dispatchModal({ type: "success", results: daftar });
    }

    if (!isLoading && isError && code >= 300) {
      dispatchModal({ type: "error", results: daftar });
    }
  }, [daftar]);

  return (
    <React.Fragment>
      <Modal modal={modal} dispatchModal={dispatchModal} />
      <FormPendaftaran
        records={records}
        imgPath={imgPath}
        postDaftar={postDaftar}
        dispatchModal={dispatchModal}
      />
    </React.Fragment>
  );
}
