import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import favoriteBtn from '../../assets/favoriteBtn.svg';
import nonFavoriteBtn from '../../assets/nonFavorited.svg';
import { favoriteAction } from '../../redux/actions/newsActions';
import { RootState } from '../../types';
import './Favorite.css';

function ButtonFavoriteNews({ id }: { id: number }) {
  const getNews = useSelector((state: RootState) => state.news);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getStorage = localStorage.getItem('favoriteNews');
    if (getStorage === null) {
      localStorage.setItem('favoriteNews', JSON.stringify([]));
    } else {
      const getStorageParse = JSON.parse(getStorage);
      if (getStorageParse.includes(id)) {
        setIsFavorite(true);
      }
    }
  }, [setIsFavorite, id]);

  const saveFavorite = () => {
    const favoriteNews = getNews.items.map((news) => {
      if (id === news.id) {
        return { ...news, favorite: !news.favorite };
      }
      return news;
    });
    dispatch(favoriteAction(favoriteNews));
    const getStorage = localStorage.getItem('favoriteNews');
    if (getStorage !== null) {
      const getStorageParse = JSON.parse(getStorage);
      if (getStorageParse.includes(id)) {
        const getStorageFilter = getStorageParse.filter(
          (favorite: number) => favorite !== id,
        );
        localStorage.setItem(
          'favoriteNews',
          JSON.stringify(getStorageFilter),
        );
      } else {
        localStorage.setItem('favoriteNews', JSON.stringify([...getStorageParse, id]));
      }
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <button className="favoriteButton" onClick={ saveFavorite }>
        {isFavorite ? (
          <img src={ favoriteBtn } alt="Botão favoritado" />
        ) : (
          <img src={ nonFavoriteBtn } alt="Botão não favoritado" />
        )}
      </button>
    </div>
  );
}

export default ButtonFavoriteNews;
