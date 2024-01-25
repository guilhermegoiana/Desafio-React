import moment from 'moment';

const calculateDate = (date: any) => {
  const dateFormat = moment(date, 'DDMMYYYY').fromNow();

  const now = new Date();
  const past = new Date(dateFormat);
  const difference = Math.abs(now.getTime() - past.getTime());
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  if (dateFormat.includes('hours')) {
    return `${dateFormat.split(' ')[0]} horas atrás`;
  }
  if (dateFormat.includes('days') && days === 1) {
    return 'Ontem';
  }
  return `${dateFormat.split(' ')[0]} dias atrás`;
};

export default calculateDate;
