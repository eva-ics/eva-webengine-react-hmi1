import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { THEME } from "../types";

const ToasterProvider = () => {
  // @ts-ignore
  const theme = useSelector((state) => state.theme);
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "",
        style: {
          border: `${theme === THEME.DARK ? "1px solid #0085FF" : ""}`,
          padding: "16px",
          backgroundColor: `${theme === THEME.DARK ? "#18212B" : "#F5F7FB"}`,
          color: `${theme === THEME.DARK ? "#C1C1C1" : "#18212B"}`,
        },
      }}
    />
  );
};

export default ToasterProvider;
