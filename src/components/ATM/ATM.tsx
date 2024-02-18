import "./ATM.css";
import CardsBox from "./CardsBox";
import Screen from "./Screen";
import sticker from "../../assets/sticker_graf.png";

const ATM = () => {
  return (
    <div className="atm">
      <Screen/>
      <div className="sticker-logo">
        <img src={sticker} alt="sticker" />
      </div>
    </div>
  );
};

export default ATM;
