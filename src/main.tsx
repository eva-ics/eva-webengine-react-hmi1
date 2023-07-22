// Third-party libraries
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import toast from "react-hot-toast";
//React
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
//Pages
import { OverviewPage, TurbinesPage } from "./pages";
import { HeaderDesktop, HeaderMobile, ThemeButton } from "./components";
// Local components
import {
  HMIApp,
  FunctionLogout,
  LoginProps,
  ItemValueDisplay,
  ControlButtonDisplay,
  ControlButtonKind,
} from "@eva-ics/webengine-react";
import { Eva, ActionResult, EvaError } from "@eva-ics/webengine";
import ToasterProvider from "./providers/ToasterProvider.tsx";
//CSS files
import "./scss/main.scss";
// Utility modules
import { Page } from "./types";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import InfoBar from "./components/InfoBar.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const eva = new Eva();

const log = eva.log;

eva.state_updates = false;
eva.debug = true;

eva.register_legacy_globals();

eva.load_config().then(() => {
  let login_props: LoginProps = {
    label_login: "User",
    label_enter: "Enter",
    otp_issuer_name: "Test HMI",
    cache_login: true,
    cache_auth: true,
  };
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    //<React.StrictMode>
    <Provider store={store}>
      <ThemeButton />
      <HMIApp engine={eva} Dashboard={HmiDashboard} login_props={login_props} />
    </Provider>
    //</React.StrictMode>
  );
});

const HmiDashboard = ({
  engine,
  logout,
}: {
  engine: Eva;
  logout: FunctionLogout;
}): JSX.Element => {
  const [page, setPage] = useState(Page.None);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setDashboardPage = (page: Page) => {
    switch (page) {
      case Page.Main:
        engine
          .set_state_updates(["sensor:tests/#", "unit:tests/#"])
          .then(() => setPage(page));
        break;
      case Page.Turbines:
        engine
          .set_state_updates(["sensor:tests/#", "unit:tests/#"])
          .then(() => setPage(page));
        break;
    }
  };

  if (page == Page.None) {
    setDashboardPage(Page.Main);
  }

  const handle_action_success = (result: ActionResult) => {
    toast.success("Success");
    log.info(`action ${result.uuid} completed`);
  };
  const handle_action_failed = (err: EvaError) => {
    toast.error(`Error ${err.message}`);
    log.error(`action error: ${err.message}`);
  };

  let content;
  switch (page) {
    case Page.Main:
      let ivt: Array<ItemValueDisplay> = [
        {
          oid: "sensor:tests/temp",
          label: "S1",
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
        },
        {
          oid: "sensor:tests/temp2",
          label: "S2",
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
        },
        {
          oid: "sensor:tests/t1",
          units: "°C",
          digits: 1,
        },
        {
          oid: "sensor:tests/t2",
          units: "%",
          digits: 1,
        },
      ];
      let ivt2: Array<ItemValueDisplay> = [
        {
          oid: "unit:tests/door",
          label: "Gate 1",
          threshold: [
            {
              value: 1,
              class: "temp_warn",
            },
          ],
          format_with: (value: any) => {
            switch (value) {
              case undefined:
                return "-";
              case 1:
                return "OPEN";
              default:
                return "CLOSED";
            }
          },
        },
        {
          oid: "unit:tests/door_remote",
          label: "Gate 2",
          threshold: [
            {
              value: 1,
              class: "temp_warn",
            },
          ],
          format_with: (value: any) => {
            switch (value) {
              case undefined:
                return "-";
              case 1:
                return "OPEN";
              default:
                return "CLOSED";
            }
          },
        },
        {
          oid: "unit:tests/srx",
          label: "SRX",
          units: "V",
          digits: 3,
        },
      ];
      let buttons: Array<ControlButtonDisplay> = [
        {
          oid: "unit:tests/door",
          label: "Gate 1",
        },
        {
          oid: "unit:tests/door_remote",
          label: "Gate 2",
        },
        {
          oid: "unit:tests/srx",
          label: "SRX",
          kind: ControlButtonKind.Value,
          input_size: 5,
        },
        {
          oid: "lmacro:m1",
          label: "M1",
          busy: "unit:tests/sr1",
        },
      ];
      const chart_oids = ["sensor:tests/temp", "sensor:tests/temp2"];
      content = (
        <>
          <ToasterProvider />
          <OverviewPage
            buttons={buttons}
            eva={eva}
            ivt={ivt}
            ivt2={ivt2}
            chart_oids={chart_oids}
            handle_action_success={handle_action_success}
            handle_action_failed={handle_action_failed}
          />
        </>
      );
      break;
    case Page.Turbines:
      content = (
        <>
          <ToasterProvider />
          <TurbinesPage eva={eva} />
        </>
      );
      break;
  }

  return (
    <>
      {isMobile ? (
        <HeaderMobile setDashboardPage={setDashboardPage} logout={logout} />
      ) : (
        <HeaderDesktop setDashboardPage={setDashboardPage} logout={logout} />
      )}
      <div className="container">
        <div>&nbsp;</div>
        <div className="title-wrapper ">
          <h3 className="heading-h3">{page}</h3>
        </div>
        {content}
        <InfoBar engine={engine} />
      </div>
    </>
  );
};
