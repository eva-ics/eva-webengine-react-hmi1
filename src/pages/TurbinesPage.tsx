// Local components
import { Canvas } from "@eva-ics/webengine-react";
// Utility modules
import { TurbinesPageProps } from "../types";
import { ActionResult, EvaError } from "@eva-ics/webengine";
import toast from "react-hot-toast";

const TurbinesPage = ({ eva }: TurbinesPageProps) => {
  const log = eva.log;
  const handle_action_success = (result: ActionResult) => {
    toast.success("Success");
    log.info(`action ${result.uuid} completed`);
  };
  const handle_action_failed = (err: EvaError) => {
    toast.error(`Error ${err.message}`);
    log.error(`action error: ${err.message}`);
  };

  return (
    <>
      <div className="turbines-wrapper root-container">
        <Canvas
          css_class="turbine"
          image="https://upload.wikimedia.org/wikipedia/commons/e/ee/Wind_turbine_blank1.svg"
          items={[
            {
              oid: "sensor:tests/temp",
              label: "TT",
              units: "°C",
              digits: 1,
              threshold: [
                {
                  value: 70,
                  class: "temp_high",
                },
                {
                  value: 50,
                  class: "temp_warn",
                },
              ],
              position: { x: 160, y: 170 },
            },
          ]}
          buttons={[
            {
              oid: "unit:tests/door",
              label: "Gate 1",
              css_class: "gate",
            },
            {
              oid: "lmacro:m1",
              label: "M1",
              busy: "unit:tests/sr1",
              css_class: "m1",
            },
          ]}
          on_success={handle_action_success}
          on_fail={handle_action_failed}
          engine={eva}
        />
        <Canvas
          css_class="turbine"
          image="https://upload.wikimedia.org/wikipedia/commons/e/ee/Wind_turbine_blank1.svg"
          items={[
            {
              oid: "sensor:tests/temp2",
              label: "TT",
              units: "°C",
              digits: 1,
              threshold: [
                {
                  value: 70,
                  class: "temp_high",
                },
                {
                  value: 50,
                  class: "temp_warn",
                },
              ],
              position: { x: 160, y: 170 },
            },
          ]}
          buttons={[
            {
              oid: "unit:tests/door_remote",
              label: "Gate 2",
              css_class: "gate",
            },
          ]}
          on_success={handle_action_success}
          on_fail={handle_action_failed}
          engine={eva}
        />
      </div>
    </>
  );
};

export default TurbinesPage;
