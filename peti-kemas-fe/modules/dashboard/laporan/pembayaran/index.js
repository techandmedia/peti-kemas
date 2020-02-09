import { Table, Typography } from "antd";
import usePostData from "utils/api/usePostData";
import customColumns from "./utils/columns";

const { Title } = Typography;

export default function LaporanPembayaran() {
  const [perbaikan] = usePostData("pendaftaran", {
    type: "get-all"
  });

  const columns = customColumns();

  const Header = () => (
    <Title level={2} style={{ textAlign: "center", color: "orangered" }}>
      Laporan Pembayaran
    </Title>
  );

  return (
    <React.Fragment>
      <Table
        title={() => <Header />}
        bordered
        rowKey="id_pendaftaran"
        loading={perbaikan.isLoading}
        columns={columns}
        dataSource={perbaikan.data}
      />
    </React.Fragment>
  );
}
