import { Divider, Typography } from 'antd';
const { Title } = Typography;

export default function Laporan() {
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        borderRight: 'grey 3px solid',
        // borderRadius: 15,
        padding: 10,
      }}>
      <Title level={4} style={{ textAlign: 'center', color: 'black' }}>
        Laporan Bulan Januari 2020
      </Title>
      <ol>
        <li>Jumlah Pelanggan</li>

        <li>Jumlah Perbaikan</li>

        <li>Jumlah Peti Kemas</li>
      </ol>

      <Divider />

      <Title level={4} style={{ textAlign: 'center', color: 'black' }}>
        Laporan Tahun 2020
      </Title>
      <ol>
        <li>Jumlah Pelanggan</li>

        <li>Jumlah Perbaikan</li>

        <li>Jumlah Peti Kemas</li>
      </ol>
    </div>
  );
}
