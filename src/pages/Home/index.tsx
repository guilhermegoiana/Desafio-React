import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import trybeLogo from '../../assets/trybe.svg';
import { newsAction } from '../../redux/actions/newsActions';
import { Dispatch, RootState } from '../../types';
import calculateDate from '../../utils/functions';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const news = useSelector((state: RootState) => state.news);

  console.log(news.items[0].imagens);

  useEffect(() => {
    dispatch(newsAction());
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <img src={ trybeLogo } alt="React Logo" className="logo" />
        <h1>TRYBE NEWS</h1>
        <button type="button" onClick={ () => navigate('/home') } disabled>
          Home
        </button>
      </header>
      {news.count === 0 ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div>
          <div className="center">
            <img src={ JSON.parse(news.items[0].imagens) } alt="" className="firstImg" />
            <div className="firstText">
              <p className="maisRecente">Notícia mais recente</p>
              <h2 className="firstTitle">{news.items[0].titulo}</h2>
              <p className="firstIntroduction">{news.items[0].introducao}</p>
              <div className="DateLink">
                <p className="firstDate">
                  {calculateDate(news.items[0].data_publicacao)}
                </p>
                <Link
                  to={ `/noticia/${news.items[0].id}` }
                  className="firstLink"
                >
                  Leia a notícia aqui
                </Link>
              </div>
            </div>
          </div>
          <main>
            <h2>Notícias</h2>
            <section className="news">
              {news.items.map((item) => (
                <article key={ item.id }>
                  <h3>{ item.titulo }</h3>
                  <p>{ item.introducao }</p>
                </article>
              ))}
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
