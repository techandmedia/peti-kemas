import { Form, Input, Button } from "antd";
import Pendaftaran from "./Pendaftaran";
import BuktiBayar from "./BuktiBayar";

const FormPendaftaran = Form.create({ name: "register" })(
  Pendaftaran
);
const FormBuktiBayar = Form.create({ name: "bayar" })(
  BuktiBayar
);

export default function Index() {
  return (
    <React.Fragment>
      <FormPendaftaran />
      <FormBuktiBayar />
    </React.Fragment>
  );
}
