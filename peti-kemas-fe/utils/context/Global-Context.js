import { createContext, useReducer, useState } from "react";
import { selectMenuReducer, userReducer } from "../reducers";
import { useModal } from "components/modal";

const MenuContext = createContext(null);
const UserContext = createContext(null);
const StatusContext = createContext(null);

const master = ["master pusat", "akademik", "civitas"];
const pmbOnline = ["konfigurasi", "maba"];
const akademika = ["akademika"];
const grafikView = ["grafik view"];
const forlapDikti = ["forlap dikti"];
const konfigurasi = ["konfigurasi"];
const akunSaya = ["akun saya"];

export default function GlobalProvider(props) {
  const [user, dispatchUser] = useReducer(userReducer, {
    isUserLoggedIn: false,
    // isUserLoggedIn: true,
    defaultPage: "/",
    /**
     * Modul di dalam dashboard
     * index ke 0: penjualan
     * index ke 1: pembelian, dst
     * Default nya kosong semua di awal
     * ['', '']
     */
    modules: [
      { key: "dashboard", children: ["dashboard"] },
      { key: "master", children: [...master] },
      { key: "pmb online", children: [...pmbOnline] },
      { key: "akademika", children: [...akademika] },
      { key: "grafik view", children: [...grafikView] },
      { key: "forlap dikti", children: [...forlapDikti] },
      { key: "konfigurasi", children: [...konfigurasi] },
      { key: "akun saya", children: [...akunSaya] }
    ],
    /**
     * Default access: 0, bisa dibuka
     * 1 tidak bisa dibuka
     * Create, Read, Update, Delete
     * Default all 0, have access
     */
    penjualan: [0, 0, 0, 0],
    pembelian: [0, 0, 0, 0]
  });
  const [menu, dispatchMenu] = useReducer(selectMenuReducer, {
    key: "home"
  });
  const [modal, dispatchModal] = useModal();
  const [status, setStatus] = useState(false);

  return (
    <MenuContext.Provider value={{ menu, dispatchMenu, modal, dispatchModal }}>
      <UserContext.Provider value={{ user, dispatchUser }}>
        <StatusContext.Provider value={{ status, setStatus }}>
          {props.children}
        </StatusContext.Provider>
      </UserContext.Provider>
    </MenuContext.Provider>
  );
}

export { MenuContext, UserContext, StatusContext };
