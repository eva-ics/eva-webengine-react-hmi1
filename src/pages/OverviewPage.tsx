// Local components
import {
  ControlBlock,
  ItemValueTable,
  LineChart,
} from "@eva-ics/webengine-react";
import { StateProp } from "@eva-ics/webengine";
// Utility modules
import { OverviewPageProps } from "../types";

const OverviewPage = ({
  buttons,
  eva,
  ivt,
  ivt2,
  chart_oids,
  handle_action_success,
  handle_action_failed,
}: OverviewPageProps) => {
  return (
    <main>
      <ul className="dashboards-list">
        <li>
          <LineChart
            oid={chart_oids}
            timeframe="1T"
            fill="1S:2"
            title="int.temp"
            update={2}
            colors={["rgba(0,165,255, 0.5)", "rgba(255,165,0, 0.5)"]}
            labels={["sensor#1", "sensor#2"]}
            options={{
              responsive: true,
              animations: false,
            }}
            engine={eva}
          />
        </li>
        <li>
          {" "}
          <ControlBlock
            title="Gate controls"
            buttons={buttons}
            engine={eva}
            on_success={handle_action_success}
            on_fail={handle_action_failed}
          />
        </li>
        <li>
          <LineChart
            oid={chart_oids[0]}
            timeframe={["1H", "2H:1H"]}
            fill="5T:2"
            title="temp diff"
            prop={StateProp.Any}
            update={2}
            colors={["red", "orange"]}
            labels={["now", "hour ago"]}
            options={{
              animations: false,
            }}
            engine={eva}
          />
        </li>
        <li>
          <ItemValueTable title="Sensor block A" items={ivt} engine={eva} />
        </li>
        <li>
          {" "}
          <ItemValueTable title="Sensor block B" items={ivt2} engine={eva} />
        </li>
      </ul>
    </main>
  );
};

export default OverviewPage;
