import { useContext } from "react";
import { UserContext } from "utils/context/Global-Context";
import Perbaikan from "./dashboard/perbaikan";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  if (user.isUserLoggedIn) {
    return <Perbaikan />;
  }

  return <h1>You are not authorized to see this page, please login</h1>;
}
