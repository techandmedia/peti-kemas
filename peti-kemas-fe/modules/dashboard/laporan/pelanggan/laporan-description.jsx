import { Descriptions, Badge } from 'antd';

export default function DescriptionsPage() {
  return (
    <Descriptions title='Laporan Bulan Januari Tahun 2020' bordered>
      <Descriptions.Item label='Jumlah Pelanggan' span={24}>
        12
      </Descriptions.Item>
      <Descriptions.Item label='Jumlah Perbaikan' span={24}>
        39
      </Descriptions.Item>
      <Descriptions.Item label='Jumlah Peti Kemas' span={24}>
        39
      </Descriptions.Item>
      <Descriptions.Item label='Status Pekerjaan' span={24}>
        <Badge status='processing' text='Lancar' />
      </Descriptions.Item>
      <Descriptions.Item label='Status Pembayaran' span={24}>
        <Badge status='processing' text='Lancar' />
      </Descriptions.Item>
    </Descriptions>
  );
}
