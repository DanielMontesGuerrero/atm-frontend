import User from "../types/User";
import rawUsers from "./users.json";

const Users = new Map<string, User>();

function loadUsers() {
  rawUsers.forEach((user) => {
    Users.set(user.username, user);
  });
}

export function validatePin(
  username: string,
  pin: string | undefined,
): boolean {
  if (Users.size === 0) {
    loadUsers();
  }
  if (Users.has(username)) {
    const user = Users.get(username);
    return user?.pin === pin;
  }
  return false;
}

export function getUser(username: string): User | undefined {
  if (Users.size === 0) {
    loadUsers();
  }
  return Users.get(username);
}

export function withdraw(user: User | undefined, amount: number) {
  if (Users.size === 0) {
    loadUsers();
  }
  if (user === undefined) {
    return "Invalid User, try again";
  }
  const dbUser = Users.get(user?.username);
  if (dbUser === undefined) {
    return "User doensn't exist";
  }
  if (dbUser.balance < amount) {
    return "You don't have sufficient funds";
  }
  dbUser.balance -= amount;
  return "Take your cash, thank you!";
}

export function getBalance(user: User | undefined) {
  if (Users.size === 0) {
    loadUsers();
  }
  if (user === undefined) {
    return "Invalid User, try again";
  }
  const dbUser = Users.get(user?.username);
  if (dbUser === undefined) {
    return "User doensn't exist";
  }
  return Users.get(user.username)?.balance;
}

export function deposit(user: User | undefined, amount: number) {
  if (Users.size === 0) {
    loadUsers();
  }
  if (user === undefined) {
    return "Invalid User, try again";
  }
  const dbUser = Users.get(user?.username);
  if (dbUser === undefined) {
    return "User doensn't exist";
  }
  dbUser.balance += amount;
  return "Thank you, your balance will reflect shortly";
}

export function updatePin(user: User | undefined, newPin: string | undefined) {
  if (Users.size === 0) {
    loadUsers();
  }
  if (user === undefined) {
    return "Invalid User, try again";
  }
  const dbUser = Users.get(user?.username);
  if (dbUser === undefined) {
    return "User doensn't exist";
  }
  if (newPin === undefined || newPin?.length !== 4) {
    return "Your PIN must have 4 digits";
  }
  dbUser.pin = newPin;
  return "Your PIN was updated, thank you!";
}
