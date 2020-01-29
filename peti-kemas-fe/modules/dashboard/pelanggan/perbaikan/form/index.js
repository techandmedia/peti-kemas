import { useState, useEffect, useContext } from "react";
import { StatusContext } from "utils/context/Global-Context";
import usePostData from "utils/api/usePostData";
import Modal, { useModal } from "components/modal";
import PemberianNomorAntrian from "./PemberianNomorAntrian";

export default function Index({ records }) {
  const { setStatus } = useContext(StatusContext);
  const [daftar, updatePendaftaran] = usePostData("", "");
  const [modal, dispatchModal] = useModal();

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
      <PemberianNomorAntrian
        records={records}
        updatePendaftaran={updatePendaftaran}
        dispatchModal={dispatchModal}
      />
    </React.Fragment>
  );
}
