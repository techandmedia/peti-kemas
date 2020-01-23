import { useContext } from "react";
import { UserContext } from "utils/context/Global-Context";
import PelangganPage from "modules/dashboard/laporan/pelanggan";

export default function LaporanPelanggan() {
  const { user } = useContext(UserContext);

  if (user.isUserLoggedIn) {
    return <PelangganPage />;
  }

  return <h1>Not Authorized</h1>;
}
