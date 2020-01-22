import { useEffect, useContext } from "react";
import { Form } from "antd";
import { UserContext } from "utils/context/Global-Context";
import usePostData from "utils/api/usePostData";
import Modal, { useModal } from "components/modal";
import { style } from "utils/styles/background";
import NormalLoginForm from "./login-admin";

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default function LoginForm() {
  const { dispatchUser } = useContext(UserContext);
  const [login, postLogin] = usePostData("", "");
  const [modal, dispatchModal] = useModal();

  useEffect(() => {
    const { code, title, message, isLoading, isError } = login;
    if (!isLoading && code >= 200 && code < 300) {
      dispatchModal({ type: "success", results: { title, message } });
      setTimeout(() => {
        dispatchUser({ type: "login-success" });
      }, 1000);
    }

    if (!isLoading && code >= 300 && code < 500) {
      dispatchModal({ type: "error", results: { title, message } });
    }
  }, [login]);

  return (
    <div style={style}>
      <div className="new-background">
        <Modal modal={modal} dispatchModal={dispatchModal} />
        <WrappedNormalLoginForm postLogin={postLogin} />
      </div>
    </div>
  );
}
