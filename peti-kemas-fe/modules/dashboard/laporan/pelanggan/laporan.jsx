import { Divider, Typography } from 'antd';
const { Title } = Typography;
import Description from './laporan-description';

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
      <Description />
    </div>
  );
}
