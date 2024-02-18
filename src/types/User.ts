import CardTypes from "./CardTypes";

interface User {
  username: string;
  pin: string;
  balance: number;
  cardType: CardTypes;
}

export default User;
