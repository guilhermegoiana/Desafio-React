import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// type GlobalState = ReturnType<typeof store.getState>;

export type RootState = {
  news: News,
};

export type News = {
  count: number,
  page: number,
  totalPages: number,
  nextPage: number,
  previousPage: number,
  showingFrom: number,
  showingTo: number,
  items: ItemType[],
};

export const INITIAL_STATE = {
  news: {
    count: 0,
    page: 0,
    totalPages: 0,
    nextPage: 0,
    previousPage: 0,
    showingFrom: 0,
    showingTo: 0,
    items: [{
      data_publicacao: '',
      destaque: true,
      editorias: '',
      id: 0,
      imagens: '',
      introducao: '',
      link: '',
      produto_id: 0,
      produtos: '',
      produtos_relacionados: '',
      tipo: '',
      titulo: '',
      favorite: false,
    }],
  },
};

export type ItemType = {
  data_publicacao: string,
  destaque: boolean,
  editorias: string,
  id: number,
  imagens: string,
  introducao: string,
  link: string,
  produto_id: number,
  produtos: string,
  produtos_relacionados: string,
  tipo: string,
  titulo: string,
  favorite: boolean,
};

export type Dispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// export default Dispatch;
