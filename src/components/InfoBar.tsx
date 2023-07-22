// Utility modules
import { InfoBarProps } from "../types";

const InfoBar = ({ engine }: InfoBarProps) => {
  return (
    <div className="infobar">
      <span>U: {engine.authorized_user}</span>
      <span>S: {engine.system_name()}</span>
      <span>
        {" "}
        E: {engine?.server_info?.version}/{engine?.server_info?.build}/
        {engine.version}/{engine.get_mode()}
      </span>
    </div>
  );
};

export default InfoBar;
