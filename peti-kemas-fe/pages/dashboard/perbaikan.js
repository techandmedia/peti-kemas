import { useContext } from "react";
import { UserContext } from "utils/context/Global-Context";
import PerbaikanPelangganPage from "modules/dashboard/pelanggan/perbaikan";

export default function PerbaikanPelanggan() {
  const { user } = useContext(UserContext);

  if (user.isUserLoggedIn) {
    return <PerbaikanPelangganPage />;
  }

  return <h1>Not Authorized</h1>;
}
