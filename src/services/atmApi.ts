import User from "../types/User";

export function validatePin(username: string, pin: string | undefined){
  return true;
}

export function getUser(username: string): User {
  return {
    username: "Daniel",
    pin: "1234",
  };
}
