import { Row, Col, Typography, Divider } from "antd";
import Laporan from "./laporan";
import Grafix from "./grafix-chart";

const { Title } = Typography;

export default function LaporanPelanggan() {
  return (
    <Row type="flex" justify="center" gutter={16}>
      <Col span={12}>
        <Title level={3} style={{ textAlign: "center", color: "grey" }}>
          Laporan CV. BMC: Pelanggan
        </Title>

        <Divider />
        <Laporan />
      </Col>

      <Col span={12}>
        <Title level={3} style={{ textAlign: "center", color: "orange" }}>
          Chart Pelanggan
        </Title>
        <Divider />
        <div style={{ marginTop: "75px" }}>
          <Grafix />
        </div>
      </Col>
    </Row>
  );
}
