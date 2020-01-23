import { useContext } from "react";
import { UserContext } from "utils/context/Global-Context";
import PembayaranPage from "modules/dashboard/laporan/pembayaran";

export default function LaporanPembayaran() {
  const { user } = useContext(UserContext);

  if (user.isUserLoggedIn) {
    return <PembayaranPage />;
  }

  return <h1>Not Authorized</h1>;
}
