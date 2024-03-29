import { Dispatch, ItemType, RootState } from '../../types';

export const REQUEST_SUCCESSFULL = 'REQUEST_SUCCESSFULL';
export const REQUEST_STARTED = 'REQUEST_STARTED';

export const requestStarted = () => ({
  type: REQUEST_STARTED,
});

export const requestSuccessfull = (data: RootState) => ({
  type: REQUEST_SUCCESSFULL,
  payload: data,
});

export const newsAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestStarted());
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
      const data = await response.json();
      data.items.map((item: ItemType) => {
        item.favorite = false;
        return item;
      });

      dispatch(requestSuccessfull(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const favoriteAction = (data: ItemType[]) => ({
  type: 'FAVORITE',
  payload: data,
});

export const FILTER = 'FILTER';

export const listFilter = (data: ItemType[]) => ({
  type: 'FILTER',
  payload: data,
});
