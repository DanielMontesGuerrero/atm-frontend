import "./Screen.css";
import systems from "../../assets/systems.png";
import {useEffect, useState} from "react";
import ATMActionNames from "../../types/ATMActionNames";
import Actions from "../../utils/Actions";
import {ATMOption} from "../../types/ATMAction";
import User from "../../types/User";
import {deposit, getUser, updatePin, validatePin, withdraw} from "../../services/atmApi";
import CardsBox from "./CardsBox";
import CardTypes from "../../types/CardTypes";
import useSound from "use-sound";
import beep from "../../assets/beep.mp3";

interface ButtonProps {
  onClick?: () => void;
}

const Button = ({onClick}: ButtonProps) => {
  const [playBeep] = useSound(beep);

  return (
    <div className="atm-button">
      <button onClick={() => {
        onClick?.();
        playBeep();
      }}/>
      <div/>
    </div>
  );
};

interface ButtonScreenTextProps {
  message?: string;
}

const ButtonScreenText = ({message}: ButtonScreenTextProps) => {

  return (
    <div className="atm-button-label">
      <p>{message}</p>
      {message !== undefined ?
        <div/> :
        <></>
      }
    </div>
  );
};

interface IActionContext {
  pin?: string;
  user?: User;
  message?: string;
  amount?: string;
}

function getContextFromAtmOption(atmOption: ATMActionNames): IActionContext | null{
  switch(atmOption){
    case ATMActionNames.ENTER_PIN:
      return {
        pin: '',
    };
    default: return null;
  }
}

interface ScreenProps {
  selectedUser: string;
}

const Screen = ({selectedUser}: ScreenProps) => {
  const [atmOption, setAtmOption] = useState(ATMActionNames.WELCOME);
  const [actionContext, setActionContext] = useState<IActionContext>({});
  const atmOptionData = Actions.get(atmOption);
  const [playBeep] = useSound(beep);

  useEffect(() => {
    const ctx = getContextFromAtmOption(atmOption);
    if(ctx !== null)
      setActionContext(ctx);
  }, [atmOption])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if(('0' <= event.key && event.key <= '9') || event.key === "Backspace"){
        playBeep();
        dispatchKeyDown(event.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const dispatchKeyDown = (key: string) => {
    switch(atmOption) {
      case ATMActionNames.ENTER_PIN:
      case ATMActionNames.RE_ENTER_PIN:
        if (actionContext.pin !== undefined) {
          if(key === "Backspace") {
            setActionContext({
              ...actionContext,
              pin: actionContext.pin.slice(0, -1),
            });
          }
          else if(actionContext.pin.length < 4){
            setActionContext({
              ...actionContext,
              pin: actionContext.pin + key,
            });
          }
        }
        break;
      case ATMActionNames.WITHDRAW:
      case ATMActionNames.DEPOSIT:
        if (actionContext.amount !== undefined) {
          if(key === "Backspace") {
            setActionContext({
              ...actionContext,
              amount: actionContext.amount.slice(0, -1),
            });
          }
          else if(actionContext.amount.length < 10){
            setActionContext({
              ...actionContext,
              amount: actionContext.amount + key,
            });
          }
        }
        break;
      default:
        break;
    }
  };

  const dispatchAtmAction = (atmAction: ATMOption) => {
    switch(atmAction.action) {
      case 'go-next-action':
        setAtmOption(atmAction.nextAtmOption);
        break;
      case 'validate-pin':
        if(validatePin(selectedUser, actionContext.pin)){
          const user = getUser(selectedUser);
          setActionContext({user, amount: "", pin: ""});
          setAtmOption(atmAction.nextAtmOption);
        }
        else{
          setActionContext({
            message: 'Invalid PIN, try again',
          })
          setAtmOption(ATMActionNames.MESSAGE);
        }
        break;
      case 'withdraw':
        if(actionContext.amount !== undefined){
          const amount = parseInt(actionContext.amount);
          const result = withdraw(actionContext.user, amount);
          setActionContext({message: result});
          setAtmOption(atmAction.nextAtmOption);
        }
        else{
          setActionContext({message: "Invalid amount, try again"});
          setAtmOption(ATMActionNames.MESSAGE);
        }
        break;
      case 'deposit':
        if(actionContext.amount !== undefined){
          const amount = parseInt(actionContext.amount);
          const result = deposit(actionContext.user, amount);
          setActionContext({message: result});
          setAtmOption(atmAction.nextAtmOption);
        }
        else{
          setActionContext({message: "Invalid amount, try again"});
          setAtmOption(atmAction.nextAtmOption);
        }
        break;
      case 'update-pin':
        const result = updatePin(actionContext.user, actionContext.pin);
        setActionContext({message: result});
        setAtmOption(atmAction.nextAtmOption);
        break;
      default: break;
    }
  };

  const mapScreenButtons = (buttonObjects: ATMOption[], side: string) => {
    const buttons = [];
    for(let i = 0; i < 4; i++){
      if(i >= buttonObjects.length){
        buttons.push(<ButtonScreenText key={`screen-button-${side}-${i}`}/>);
      }
      else{
        buttons.push(<ButtonScreenText key={`screen-button-${side}-${i}`} message={buttonObjects[i].name} />)
      }
    }
    return buttons;
  };

  const mapButtons = (buttonObjects: ATMOption[], side: string) => {
    const buttons = [];
    for(let i = 0; i < 4; i++){
      if(i >= buttonObjects.length){
        buttons.push(<Button key={`button-${side}-${i}`}/>);
      }
      else{
        buttons.push(<Button key={`button-${side}-${i}`} onClick={() => dispatchAtmAction(buttonObjects[i])} />)
      }
    }
    return buttons;
  };

  if (atmOptionData === undefined) {
    return <p>Error</p>;
  }

  return (
    <div className="atm-interface">
      <CardsBox activeCard={actionContext.user?.cardType ?? CardTypes.NONE}/>
      <div className="atm-interface-output">
        <div style={{flex: 1}}></div>
        <div className="atm-interface-output-message">
          <p>{atmOptionData.message(actionContext)}</p>
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div className="atm-interface-input">
        <div className="buttons left-buttons">
          {mapButtons(atmOptionData.leftOptions, "left")}
        </div>
        <div className="display">
          <div className="button-labels left-labels">
            {mapScreenButtons(atmOptionData.leftOptions, "left")}
          </div>
          <div className="button-labels right-labels">
            {mapScreenButtons(atmOptionData.rightOptions, "right")}
          </div>
        </div>
        <div className="buttons right-buttons">
          {mapButtons(atmOptionData.rightOptions, "right")}
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
