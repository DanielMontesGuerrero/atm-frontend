import ATMAction from "../types/ATMAction";
import ATMActionNames from "../types/ATMActionNames";

const Actions = new Map<ATMActionNames, ATMAction>([
  [
    ATMActionNames.WELCOME,
    {
      message: () => "Welcome to the ATM",
      leftOptions: [],
      rightOptions: [
        {
          name: "Enter PIN",
          nextAtmOption: ATMActionNames.ENTER_PIN,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.MESSAGE,
    {
      message: ({ message }) => message,
      leftOptions: [],
      rightOptions: [
        {
          name: "Exit",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.ENTER_PIN,
    {
      message: ({ pin }) =>
        `Please, enter you PIN and hit OK: ${"*".repeat(pin?.length ?? 0)}`,
      leftOptions: [],
      rightOptions: [
        {
          name: "OK",
          nextAtmOption: ATMActionNames.CHOOSE_OPTION,
          action: "validate-pin",
        },
        {
          name: "Exit",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.CHOOSE_OPTION,
    {
      message: ({ user }) => `Hi ${user?.username}! Please make a choice...`,
      leftOptions: [
        {
          name: "Deposit",
          nextAtmOption: ATMActionNames.DEPOSIT,
          action: "go-next-action",
        },
        {
          name: "Withdraw",
          nextAtmOption: ATMActionNames.WITHDRAW,
          action: "go-next-action",
        },
      ],
      rightOptions: [
        {
          name: "Re-Enter PIN",
          nextAtmOption: ATMActionNames.RE_ENTER_PIN,
          action: "go-next-action",
        },
        {
          name: "Balance",
          nextAtmOption: ATMActionNames.BALANCE,
          action: "go-next-action",
        },
        {
          name: "Exit",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.WITHDRAW,
    {
      message: ({ amount }) => `Enter the amount: $${amount ?? 0}`,
      leftOptions: [],
      rightOptions: [
        {
          name: "OK",
          nextAtmOption: ATMActionNames.MESSAGE,
          action: "withdraw",
        },
        {
          name: "Cancel",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.DEPOSIT,
    {
      message: ({ amount }) => `Enter the amount: $${amount ?? 0}`,
      leftOptions: [],
      rightOptions: [
        {
          name: "OK",
          nextAtmOption: ATMActionNames.MESSAGE,
          action: "deposit",
        },
        {
          name: "Cancel",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.BALANCE,
    {
      message: ({ user }) => `Your current balance is: $${user?.balance ?? 0}`,
      leftOptions: [],
      rightOptions: [
        {
          name: "OK",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
  [
    ATMActionNames.RE_ENTER_PIN,
    {
      message: ({ pin }) =>
        `Enter your new PIN: ${"*".repeat(pin?.length ?? 0)}`,
      leftOptions: [],
      rightOptions: [
        {
          name: "Save",
          nextAtmOption: ATMActionNames.MESSAGE,
          action: "update-pin",
        },
        {
          name: "Cancel",
          nextAtmOption: ATMActionNames.WELCOME,
          action: "go-next-action",
        },
      ],
    },
  ],
]);

export default Actions;
