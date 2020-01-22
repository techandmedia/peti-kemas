import { useState } from "react";
import { Form } from "antd";
import Pendaftaran from "./Pendaftaran";
import BuktiBayar from "./BuktiBayar";

const FormPendaftaran = Form.create({ name: "register" })(Pendaftaran);
const FormBuktiBayar = Form.create({ name: "bayar" })(BuktiBayar);

export default function Index() {
  const [imgPath, setPath] = useState("");

  return (
    <React.Fragment>
      <FormPendaftaran imgPath={imgPath} />
      <FormBuktiBayar imgPath={imgPath} setPath={setPath} />
    </React.Fragment>
  );
}
