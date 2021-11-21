import moment from 'moment';
export const getDate = (date) => {
  const fD = moment(date).format('YYYY/MM/DD hh:mm:ss');
  return fD;
};
