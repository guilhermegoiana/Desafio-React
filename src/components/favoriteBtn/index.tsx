import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import favoriteBtn from '../../assets/favoriteBtn.svg';
import nonFavoriteBtn from '../../assets/nonFavorited.svg';
import { favoriteAction } from '../../redux/actions/newsActions';
import { ItemType, RootState } from '../../types';
import './Favorite.css';

function ButtonFavoriteNews({ item }: { item: ItemType }) {
  const getNews = useSelector((state: RootState) => state.news);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const { id } = item;

  useEffect(() => {
    const getStorage = localStorage.getItem('favoriteNews');
    if (getStorage === null) {
      localStorage.setItem('favoriteNews', JSON.stringify([]));
    } else {
      const getStorageParse = JSON.parse(getStorage);
      const checkIfFavorite = getStorageParse.find(
        (favorite: ItemType) => favorite.id === id,
      );
      if (checkIfFavorite) {
        setIsFavorite(true);
      }
      dispatch(favoriteAction(getStorageParse));
    }
  }, [setIsFavorite, id, dispatch]);

  const saveFavorite = () => {
    const { favorites } = getNews;
    const checkIfFavorite = getNews.favorites.find((news) => news.id === id);
    let favoriteNews: ItemType[] = [];
    if (!checkIfFavorite) {
      const getFavoriteNews = getNews.items.find((news) => news.id === id);
      if (getFavoriteNews !== undefined) {
        favoriteNews = [...favorites, getFavoriteNews];
      }
    } else {
      favoriteNews = favorites.filter((news) => news.id !== id);
    }
    dispatch(favoriteAction(favoriteNews));
    localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));
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
