import { Tag } from "antd";

export default function customColumns() {
  const columns = [
    {
      title: "Nomor Antrian",
      dataIndex: "nomor_antrian",
      key: "nomor_antrian",
      width: 100
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
      key: "jumlah_peti_kemas",
      width: 110
    },
    {
      title: "Jumlah Pembayaran",
      children: [
        {
          title: "DP",
          dataIndex: "jumlah_dp",
          key: "jumlah_dp",
          width: 150,
          render: jumlah => <span>Rp {jumlah}</span>
        },
        {
          title: "Sisa",
          dataIndex: "jumlah_sisa",
          key: "jumlah_sisa",
          width: 150,
          render: jumlah => <span>Rp {jumlah}</span>
        },
        {
          title: "Total",
          dataIndex: "jumlah_total",
          key: "jumlah_total",
          width: 150,
          render: jumlah => <span>Rp {jumlah}</span>
        }
      ]
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

          case "PERBAIKAN":
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
      },
      width: 100
    }
  ];

  return columns;
}
