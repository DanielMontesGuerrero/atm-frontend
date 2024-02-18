import User from "../types/User";

export function validatePin(username: string, pin: string | undefined){
  return true;
}

export function getUser(username: string): User {
  return {
    username: "Daniel",
    pin: "1234",
    balance: 500,
  };
}

export function withdraw(user: User | undefined, amount: number) {
  return "Take your cash, thank you!";
}

export function deposit(user: User | undefined, amount: number) {
  return "Thank you, your balance will reflect shortly";
}

export function updatePin(user: User | undefined, newPin: string | undefined) {
  return "Your PIN was updated, thank you!";
}
