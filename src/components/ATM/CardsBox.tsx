import cards from '../../assets/creditcard_sprite.png';
import CardTypes from '../../types/CardTypes';
import './CardsBox.css';

interface CardsBoxProps {
  activeCard: CardTypes;
}

const CardsBox = ({activeCard}: CardsBoxProps) => {
  return (
    <div className="cards">
    <div className="container">
      {[1, 2, 3, 4, 5, 6].map((val) => {
        const cardType = val as CardTypes;
        return <img key={val} className={activeCard === cardType ? `icon-${val}` : `icon-${val}-disabled`} src={cards} alt="cards icons"/>
      })}
    </div>
    </div>
  );
};

export default CardsBox;
