export const regexCardNumber = /^[0-9]{4}$/;
export const regexCardNumberMin = /^[0-9]{0}$/;
export const validUnitMM = /^[a-zA-Z]{2}$/;
export const validUnitYear = /^[0-9]{4}$/;
export const validUnitCVV = /^[a-zA-Z]{3}$/;

export default function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const getDataFilter = (deliveryDates = []) => {
  return deliveryDates.map((item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const getDate = padTo2Digits(date.getDate());
    const month = padTo2Digits(date.getUTCMonth() + 1);
    return {
      date: `${year}-${month}-${getDate}`,
    };
  });
};
