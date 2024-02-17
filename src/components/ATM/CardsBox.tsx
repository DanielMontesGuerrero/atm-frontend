import cards from '../../assets/creditcard_sprite.png';
import './CardsBox.css';

const CardsBox = () => {
  return (
    <div className="cards">
    <div className="container">
      <img className="icon-1" src={cards} alt="cards icons"/>
      <img className="icon-2" src={cards} alt="cards icons"/>
      <img className="icon-3" src={cards} alt="cards icons"/>
      <img className="icon-4" src={cards} alt="cards icons"/>
      <img className="icon-5" src={cards} alt="cards icons"/>
      <img className="icon-6" src={cards} alt="cards icons"/>
    </div>
    </div>
  );
};

export default CardsBox;
