import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { ItemType, RootState } from '../../../types';
import './latestNews.css';

function LatestNews() {
  const getNews = useSelector((state: RootState) => state.news);
  const [listPresentation, setListPresentation] = useState(getNews.items);

  const handleNews = (tipoFiltro: string) => {
    let listFavorites: ItemType[] = [];
    const getLocalStorageFavoriteNews = localStorage.getItem('favoriteNews');
    switch (tipoFiltro) {
      case 'Favoritas':
        if (getLocalStorageFavoriteNews !== null) {
          listFavorites = JSON.parse(getLocalStorageFavoriteNews);
        }
        setListPresentation(
          listFavorites.filter((news) => news.favorite === true),
        );
        break;
      case 'Mais recentes':
        setListPresentation(listPresentation.map((news) => news));
        break;
      case 'Release':
        setListPresentation(
          getNews.items.filter((news) => news.tipo === 'Release'),
        );
        break;
      case 'Noticia':
        setListPresentation(
          getNews.items.filter((news) => news.tipo === 'Noticia'),
        );
        break;
      default:
        setListPresentation(getNews.items);
    }
  };

  return (
    <nav className="navContainer">
      <div className="navLink">
        <Link
          to="/recent"
          onClick={ () => {
            handleNews('Mais recentes');
          } }
        >
          Mais recentes
        </Link>
        <Link
          to="/release"
          onClick={ () => {
            handleNews('Release');
          } }
        >
          Release
        </Link>
        <Link
          to="/news"
          onClick={ () => {
            handleNews('Notícia');
          } }
        >
          Notícia
        </Link>
        <Link
          to="/favorites"
          onClick={ () => {
            handleNews('Favoritas');
          } }
        >
          Favoritas
        </Link>
      </div>
    </nav>
  );
}

export default LatestNews;
