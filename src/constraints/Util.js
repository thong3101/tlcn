export const numWithCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const reduceUUIDDisplayLength= (uuid) => {
  if (uuid) {
    return `${uuid.substring(0, 4)}...${uuid.substring(uuid.length - 4)}`;
  }
  return "";
};
export const roundPrice = (num) => Math.round(num / 100) * 100;

export const formatJavaLocalDateTime = (date) => {
 if(date){
  const year = date[0];
  const month = date[1].toString().length === 1 ? `0${date[1]}` : date[1];
  const day = date[2].toString().length === 1 ? `0${date[2]}` : date[2];
  const hour =
    date[3].toString().length === 1
      ? `0${date[3].toString()}`
      : date[3].toString();
  const minute =
    date[4].toString().length === 1
      ? `0${date[4].toString()}`
      : date[4].toString();
  const second =
    date[5].toString().length === 1
      ? `0${date[5].toString()}`
      : date[5].toString();
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
 }
};
export const formatJavaLocalDate = (date) => {
  if(date){
   const year = date[0];
   const month = date[1].toString().length === 1 ? `0${date[1]}` : date[1];
   const day = date[2].toString().length === 1 ? `0${date[2]}` : date[2];
   return `${month}-${day}-${year}`;
  }
 };
 export const formatJavaLocalDateVN = (date) => {
  if(date){
   const year = date[0];
   const month = date[1].toString().length === 1 ? `0${date[1]}` : date[1];
   const day = date[2].toString().length === 1 ? `0${date[2]}` : date[2];
   return `${day}-${month}-${year}`;
  }
 };
export const convertDate = (date) => {
  if(date){
    const year = date[0];
    const month = date[1].toString().length === 1 ? `0${date[1]}` : date[1];
    const day = date[2].toString().length === 1 ? `0${date[2]}` : date[2];
    const hour =
      date[3].toString().length === 1
        ? `0${date[3].toString()}`
        : date[3].toString();
    const minute =
      date[4].toString().length === 1
        ? `0${date[4].toString()}`
        : date[4].toString();
    const second =
      date[5].toString().length === 1
        ? `0${date[5].toString()}`
        : date[5].toString();
    return Number(new Date(`${month}-${day}-${year} ${hour}:${minute}:${second}`));
  }
};
