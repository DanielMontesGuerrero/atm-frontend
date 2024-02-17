import ATMAction from "../types/ATMAction";
import ATMActionNames from "../types/ATMActionNames";

const Actions = new Map<ATMActionNames,ATMAction>([
  [ATMActionNames.WELCOME, {
    message: () => 'Welcome to the ATM',
    leftOptions: [],
    rightOptions: [
      {
        name: 'Enter PIN',
        nextAtmOption: ATMActionNames.ENTER_PIN,
        action: 'go-next-action',
      },
    ],
  }],
  [ATMActionNames.ERROR, {
    message: ({errorMessage}) => errorMessage,
    leftOptions: [],
    rightOptions: [
      {
        name: 'Exit',
        nextAtmOption: ATMActionNames.WELCOME,
        action: 'go-next-action',
      },
    ],
  }],
  [ATMActionNames.ENTER_PIN, {
    message: ({pin}) => `Please, enter you PIN and hit OK: ${'*'.repeat(pin?.length ?? 0)}`,
    leftOptions: [],
    rightOptions: [
      {
        name: 'OK',
        nextAtmOption: ATMActionNames.CHOOSE_OPTION,
        action: 'validate-pin',
      },
      {
        name: 'Exit',
        nextAtmOption: ATMActionNames.WELCOME,
        action: 'go-next-action',
      },
    ],
  }],
  [ATMActionNames.CHOOSE_OPTION, {
    message: ({user}) => `Hi ${user?.username}! Please make a choice...`,
    leftOptions: [
      {
        name: 'Deposit',
        nextAtmOption: ATMActionNames.DEPOSIT,
        action: '',
      },
      {
        name: 'Withdraw',
        nextAtmOption: ATMActionNames.WITHDRAW,
        action: '',
      }
    ],
    rightOptions: [
      {
        name: 'Re-Enter PIN',
        nextAtmOption: ATMActionNames.RE_ENTER_PIN,
        action: '',
      },
      {
        name: 'Balance',
        nextAtmOption: ATMActionNames.BALANCE,
        action: '',
      },
      {
        name: 'Exit',
        nextAtmOption: ATMActionNames.WELCOME,
        action: '',
      },
    ],
  }],
]);

export default Actions;
