import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import trybeLogo from '../../assets/image 68.png';
import Cards from '../../components/Cards';
import LatestNews from '../../components/Cards/LatestNews';
import ButtonFavoriteNews from '../../components/favoriteBtn';
import { newsAction } from '../../redux/actions/newsActions';
import { Dispatch, RootState } from '../../types';
import calculateDate from '../../utils/functions';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const news = useSelector((state: RootState) => state.news);
  const latestNew = news.count !== 0 ? news.items[0] : '';
  const images = latestNew ? JSON.parse(latestNew.imagens) : {};

  useEffect(() => {
    dispatch(newsAction());
  }, [dispatch]);

  const cardnews = news.items.slice(0, 9);

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
            <img src={ `https://agenciadenoticias.ibge.gov.br/${images.image_intro}` } alt="" className="firstImg" />
            <div className="firstText">
              <div className="favoriteFlex">
                <p className="maisRecente">Notícia mais recente</p>
                <ButtonFavoriteNews id={ news.items[0].id } />
              </div>
              <h2 className="firstTitle">{news.items[0].titulo}</h2>
              <p className="firstIntroduction">{news.items[0].introducao}</p>
              <div className="DateLink">
                <p className="firstDate">
                  {calculateDate(news.items[0].data_publicacao)}
                </p>
                <Link
                  to={ `${news.items[0].link}` }
                  className="firstLink"
                >
                  Leia a notícia aqui
                </Link>
              </div>
            </div>
          </div>
          <main>
            <LatestNews />
            <section className="news">
              <Cards items={ cardnews } />
            </section>
          </main>
        </div>
      )}
    </div>
  );
}

export default Home;
