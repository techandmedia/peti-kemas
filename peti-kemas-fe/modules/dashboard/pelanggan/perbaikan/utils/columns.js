import { Tag, Tooltip } from "antd";
import Modal, { useModal } from "components/modal";
import moment from "moment";

export default function customColumns(dispatchModal) {
  const [modalGambar, dispatchModalGambar] = useModal();

  const columns = [
    {
      title: "Tanggal Daftar",
      dataIndex: "created_at",
      key: "created_at",
      render: date => (
        <span>{moment(date).format("DD MMMM YYYY HH:mm:ss")}</span>
      )
    },
    {
      title: "Nomor Antrian",
      dataIndex: "nomor_antrian",
      key: "nomor_antrian"
    },
    {
      title: "Nama",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap",
      render: nama => (
        <Tooltip title="Klik untuk membuat perubahan">
          <a
            onClick={() =>
              dispatchModal({
                type: "success",
                results: { title: "Edit Daftar Perbaikan" }
              })
            }
          >
            {nama}
          </a>
        </Tooltip>
      )
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
      }
    },
    {
      title: "Bukti Bayar DP",
      dataIndex: "bukti_bayar_dp",
      key: "bukti_bayar_dp",
      render: image => (
        <React.Fragment>
          {/* <Modal modal={modalGambar} dispatchModal={dispatchModalGambar}>
            <img
              width={600}
              alt="bukti-bayar"
              src={`http://localhost:3001/files/bukti-bayar-dp/${image}`}
            />
          </Modal>
          <Tooltip title="Klik untuk melihat bukti bayar" style={{ cursor: 'pointer' }}> */}
          <img
            onClick={() =>
              dispatchModalGambar({
                type: "success",
                results: { title: "Bukti Bayar DP" }
              })
            }
            style={{ height: 20, cursor: "pointer" }}
            alt="example"
            src={`http://localhost:3001/files/bukti-bayar-dp/${image}`}
          />
          {/* </Tooltip> */}
        </React.Fragment>
      )
    }
  ];

  return columns;
}
