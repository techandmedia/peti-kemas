import { Descriptions, Badge } from 'antd';
import usePostData from 'utils/api/usePostData';
import { useEffect } from 'react';

export default function DescriptionsPage() {
  const [jumlahPelanggan, getJumlahPelanggan] = usePostData('pendaftaran', {
    type: 'get-jumlah-pelanggan',
  });

  useEffect(() => {
    console.log(jumlahPelanggan);
  }, [jumlahPelanggan]);

  return (
    <Descriptions title='Laporan Bulan Januari Tahun 2020' bordered>
      <Descriptions.Item label='Jumlah Pelanggan' span={24}>
        12
      </Descriptions.Item>
      <Descriptions.Item label='Jumlah Transaksi' span={24}>
        39
      </Descriptions.Item>
      <Descriptions.Item label='Jumlah Perbaikan Peti Kemas' span={24}>
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
