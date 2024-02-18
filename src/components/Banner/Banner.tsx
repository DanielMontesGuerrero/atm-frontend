import atm from "../../assets/atm_sign.png";
import graffiti from "../../assets/graffiti.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="atm-logo">
        <img src={atm} alt="ATM logo" />
      </div>
      <div className="graffiti-logo">
        <img src={graffiti} alt="graffiti logo" />
      </div>
    </div>
  );
};

export default Banner;
