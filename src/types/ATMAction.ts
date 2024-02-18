import ATMActionNames from "./ATMActionNames";

export interface ATMOption {
  name: string;
  nextAtmOption: ATMActionNames;
  action: string;
}

interface ATMAction {
  message: (args: any | undefined) => string;
  leftOptions: ATMOption[];
  rightOptions: ATMOption[];
}

export default ATMAction;
