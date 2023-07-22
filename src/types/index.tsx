import {
  ControlButtonDisplay,
  FunctionLogout,
  ItemValueDisplay,
} from "@eva-ics/webengine-react";
import { ActionResult, Eva, EvaError } from "@eva-ics/webengine";

export enum Page {
  None,
  Main = "System Overview",
  Turbines = "Turbine status",
}

export interface OverviewPageProps {
  buttons: Array<ControlButtonDisplay>;
  eva: Eva;
  ivt: Array<ItemValueDisplay>;
  ivt2: Array<ItemValueDisplay>;
  chart_oids: string[];
  handle_action_success: (result: ActionResult) => void;
  handle_action_failed: (err: EvaError) => void;
}

export interface TurbinesPageProps {
  eva: Eva;
}
export interface HeaderProps {
  setDashboardPage: (page: Page) => void;
  logout: FunctionLogout;
}

export interface InfoBarProps {
  engine: Eva;
}

export enum NAV_LINK {
  OVERVIEW = "overview",
  TURBINES = "turbines",
}

//Theme settings
export enum THEME {
  DARK = "dark",
  LIGHT = "light",
}
