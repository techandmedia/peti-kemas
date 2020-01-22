import { Table, Tag } from "antd";
import { style } from "utils/styles/background";
import { StatusContext } from "utils/context/Global-Context";
import usePostData from "utils/api/usePostData";
import { useContext, useEffect } from "react";
import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const columns = [
  {
    title: "Tanggal Daftar",
    dataIndex: "created_at",
    key: "created_at",
    render: date => <span>{moment(date).format("DD MMMM YYYY HH:mm:ss")}</span>
  },
  {
    title: "Nomor Antrian",
    dataIndex: "nomor_antrian",
    key: "nomor_antrian"
  },
  {
    title: "Nama",
    dataIndex: "nama_lengkap",
    key: "nama_lengkap"
  },
  {
    title: "Nama Perusahaan",
    dataIndex: "nama_perusahaan",
    key: "nama_perusahaan"
  },
  {
    title: "Jumlah Peti Kemas",
    dataIndex: "jumlah_peti_kemas",
    key: "jumlah_peti_kemas"
  },
  {
    title: "Status Perbaikan",
    dataIndex: "status_perbaikan",
    key: "status_perbaikan",
    render: status => {
      let color;
      switch (status) {
        case "DAFTAR":
          color = "grey";
          break;

        case "ANTRI":
          color = "red";
          break;

        case "SEDANG PERBAIKAN":
          color = "green";
          break;

        case "SELESAI":
          color = "geekblue";
          break;

        default:
          break;
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  }
];

export default function Registration() {
  const { status, setStatus } = useContext(StatusContext);
  const [perbaikan, getDataPerbaikan] = usePostData("pendaftaran", {
    type: "get-all"
  });

  useEffect(() => {
    if (status) {
      getDataPerbaikan("pendaftaran", { type: "get-all" });
      setStatus(false);
    }
  }, [status]);

  const Header = () => (
    <Title level={2} style={{ textAlign: "center", color: "orangered" }}>
      DAFTAR PERBAIKAN Peti Kemas CV. BMC
    </Title>
  );

  return (
    <div style={style}>
      <div className="new-background">
        <Table
          title={() => <Header />}
          bordered
          rowKey="id_pendaftaran"
          loading={perbaikan.isLoading}
          columns={columns}
          dataSource={perbaikan.data}
        />
      </div>
    </div>
  );
}
