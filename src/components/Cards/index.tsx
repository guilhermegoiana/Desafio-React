import { Link } from 'react-router-dom';
import { ItemType } from '../../types';
import calculateDate from '../../utils/functions';
import ButtonFavoriteNews from '../favoriteBtn';
import './cards.css';

function Cards({ items }: { items: ItemType[] }) {
  return (
    <main>
      <section className="cards">
        {items.length === 0 ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          items.map((item) => (
            <div key={ item.id } className="cardsContainer">
              <div className="cardscenter">
                <h2 className="newsTitle">{item.titulo}</h2>
                <p className="newsIntroduction">{item.introducao}</p>
                <div className="DateLink">
                  <p className="newsDate">
                    {calculateDate(item.data_publicacao)}
                  </p>
                  <Link
                    to={ `${item.link}` }
                    className="newsLink"
                  >
                    Leia a notícia aqui
                  </Link>
                </div>
                <hr />
                <ButtonFavoriteNews id={ item.id } />
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Cards;
