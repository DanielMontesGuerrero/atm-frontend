import "./Screen.css";
import systems from "../../assets/systems.png";

const Button = () => {
  return (
    <div className="atm-button">
      <button/>
      <div/>
    </div>
  );
};

const ButtonScreenText = () => {
  return (
    <div className="atm-button-label">
      <p>Ingresa pin</p>
      <div/>
    </div>
  );
};

const Screen = () => {
  return (
    <div className="atm-interface">
      <div className="atm-interface-output">
        <div style={{flex: 1}}></div>
        <div className="atm-interface-output-message">
          <p>Message</p>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="atm-interface-input">
        <div className="buttons left-buttons">
          <Button/>
          <Button/>
          <Button/>
          <Button/>
        </div>
        <div className="display">
          <div className="button-labels left-labels">
            <ButtonScreenText/>
            <ButtonScreenText/>
            <ButtonScreenText/>
            <ButtonScreenText/>
          </div>
          <div className="button-labels right-labels">
            <ButtonScreenText/>
            <ButtonScreenText/>
            <ButtonScreenText/>
            <ButtonScreenText/>
          </div>
        </div>
        <div className="buttons right-buttons">
          <Button/>
          <Button/>
          <Button/>
          <Button/>
        </div>
      </div>
      <div className="atm-interface-footer">
        <div style={{flex: 1}}></div>
        <div className="systems-logo">
          <img src={systems} alt="systems logo"/>
        </div>
        <div style={{flex: 1}}></div>
      </div>
    </div>
  );
};

export default Screen;
