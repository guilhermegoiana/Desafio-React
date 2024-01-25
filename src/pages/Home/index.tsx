import { useEffect, useState } from 'react';
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
  const [readMore, setReadMore] = useState('Show More');

  const news = useSelector((state: RootState) => state.news);
  const latestNew = news.count !== 0 ? news.items[0] : '';
  const images = latestNew ? JSON.parse(latestNew.imagens) : {};

  useEffect(() => {
    dispatch(newsAction());
  }, [dispatch]);

  const cardNews = () => {
    if (readMore === 'Show More') {
      return news.filter.slice(0, 9);
    }
    return news.filter.slice(0, 18);
  };

  const handleReadMore = () => {
    if (readMore === 'Show Less') {
      setReadMore('Show More');
      window.scrollTo({
        top: 620,
      });
    } else {
      setReadMore('Show Less');
    }
  };

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
                <ButtonFavoriteNews item={ news.items[0] } />
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
              <Cards items={ cardNews() } />
            </section>
          </main>
          <footer className="footer">
            <button
              type="button"
              className="loadMore"
              onClick={ handleReadMore }
            >
              {readMore}
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Home;
