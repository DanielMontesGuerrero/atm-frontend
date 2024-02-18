import "./ATM.css";
import Screen from "./Screen";
import sticker from "../../assets/sticker_graf.png";
import { useState } from "react";

const ATM = () => {
  const [selectedUser, setSelectedUser] = useState("Daniel");

  return (
    <div className="atm">
      <Screen selectedUser={selectedUser} />
      <div className="sticker-logo">
        <img src={sticker} alt="sticker" />
      </div>
      <div className="user-selector">
        <label>Select the user: </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="Daniel">Daniel - Star</option>
          <option value="Esteban">Esteban - Pulse</option>
          <option value="Gabriel">Gabriel - Maestro</option>
          <option value="Kevin">Kevin - Mastercard</option>
          <option value="Jorge">Jorge - Plus</option>
          <option value="Sebastian">Sebastian - Visa</option>
        </select>
      </div>
    </div>
  );
};

export default ATM;
