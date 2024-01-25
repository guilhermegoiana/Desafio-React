import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import horizontal from '../../../assets/imageHorizontal.svg';
import vertical from '../../../assets/imageVertical.svg';
import { listFilter } from '../../../redux/actions/newsActions';
import { RootState } from '../../../types';
import './latestNews.css';

function LatestNews() {
  const getNews = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch();

  const handleNews = (tipoFiltro: string) => {
    const getLocalStorageFavoriteNews = localStorage.getItem('favoriteNews');
    switch (tipoFiltro) {
      case 'Favoritas':
        if (getLocalStorageFavoriteNews !== null) {
          const { favorites } = getNews;
          dispatch(listFilter(favorites));
        }
        break;
      case 'Mais recentes': {
        const latest = getNews.items.sort((a, b) => {
          return (new Date(
            b.data_publicacao,
          )
          ).getTime() - (new Date(a.data_publicacao)).getTime();
        });
        dispatch(listFilter(latest));
        break;
      }
      case 'Release': {
        const release = getNews.items.filter((news) => news.tipo === 'Release');
        dispatch(listFilter(release));
        break;
      }
      case 'Notícia': {
        const newsFilter = getNews.items.filter((news) => news.tipo === 'Notícia');
        dispatch(listFilter(newsFilter));
        break;
      }
      default:
        return null;
    }
  };

  const handleDirection = () => {
    return true;
  };

  return (
    <nav className="navContainer">
      <div className="navLink">
        <button
          onClick={ () => {
            handleNews('Mais recentes');
          } }
        >
          Mais recentes
        </button>
        <button
          onClick={ () => {
            handleNews('Release');
          } }
        >
          Release
        </button>
        <button
          onClick={ () => {
            handleNews('Notícia');
          } }
        >
          Notícia
        </button>
        <button
          onClick={ () => {
            handleNews('Favoritas');
          } }
        >
          Favoritas
        </button>
      </div>
      <button className="directionNews" onClick={ handleDirection }>
        <img src={ horizontal } alt="" />
        <img src={ vertical } alt="" />
      </button>
    </nav>
  );
}

export default LatestNews;
