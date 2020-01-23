import { useContext, useEffect, useState } from "react";
import { Table, Typography, Divider } from "antd";
import { StatusContext } from "utils/context/Global-Context";
import Modal, { useModal } from "components/modal";
import usePostData from "utils/api/usePostData";

import FormEdit from "./form";
import customColumns from "./utils/columns";

const { Title } = Typography;

export default function DaftarPerbaikanPelanggan() {
  const { status, setStatus } = useContext(StatusContext);
  const [modal, dispatchModal] = useModal();
  const [perbaikan, getDataPerbaikan] = usePostData("pendaftaran", {
    type: "get-all"
  });
  const [records, setRecords] = useState(null);

  const columns = customColumns(dispatchModal);

  useEffect(() => {
    if (status) {
      getDataPerbaikan("pendaftaran", { type: "get-all" });
      setStatus(false);
    }
  }, [status]);

  useEffect(() => {
    console.log(records);
  }, [records]);

  const Header = () => (
    <Title level={2} style={{ textAlign: "center", color: "orangered" }}>
      DAFTAR PERBAIKAN Peti Kemas CV. BMC
    </Title>
  );

  return (
    <React.Fragment>
      <Modal modal={modal} dispatchModal={dispatchModal}>
        {records !== null && records.nama_lengkap} adalah pemilik{" "}
        {records !== null && records.nama_perusahaan}
        <Divider />
        <img
          // height={600}
          width={300}
          alt="bukti-bayar"
          src={`http://localhost:3001/files/bukti-bayar-dp/${records !== null &&
            records.bukti_bayar_dp}`}
        />
        <Divider />
        <FormEdit records={records} />
      </Modal>
      <Table
        title={() => <Header />}
        bordered
        rowKey="id_pendaftaran"
        loading={perbaikan.isLoading}
        columns={columns}
        dataSource={perbaikan.data}
        onRow={record => {
          return {
            onClick: () => {
              setRecords(record);
            }
          };
        }}
      />
    </React.Fragment>
  );
}
