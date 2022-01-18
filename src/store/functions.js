export const getNumberOfCurrency = (str) => {
  if (str === "USD") {
    return 0;
  } else if (str === "GBP") {
    return 1;
  } else if (str === "AUD") {
    return 2;
  } else if (str === "JPY") {
    return 3;
  } else if (str === "RUB") {
    return 4;
  }
};

export const getLengthOfObject = (obj) => {
  let lengthOfObject = Object.keys(obj).length;
  return lengthOfObject;
};

const comparison = (obj1, obj2) => {
  for (let item in obj1) {
    if (obj1[item] !== obj2[item]) {
      return false;
    }
  }
  return true;
};

export const add_to_cart_pr = (cart, payload) => {
  const index =
    cart && cart.length
      ? cart.findIndex(
          (item) =>
            item.id === payload.id &&
            comparison(item.attributes, payload.attributes) === true
        )
      : -1;

  if (index === -1) {
    payload.count = 1;
    cart.push(payload);
  } else {
    cart[index].count += 1;
  }

  return cart;
};

export const increment_pr = (cart, payload) => {
  const index = cart.findIndex(
    (item) =>
      item.id === payload.id &&
      comparison(item.attributes, payload.attributes) === true
  );

  cart[index].count += 1;

  return cart;
};

export const decrement_pr = (cart, payload) => {
  const index = cart.findIndex(
    (item) =>
      item.id === payload.id &&
      comparison(item.attributes, payload.attributes) === true
  );

  cart[index].count -= 1;

  let newCart = cart.filter((cartItem) => cartItem.count > 0);

  return newCart;
};

export const measure_len = (arr) => {
  let i = 0;
  arr.forEach((item) => {
    if (item.count !== 0) {
      i++;
    }
  });
  return i;
};

export const total_sum = (cart) => {
  let sum = 0;
  const idx = getNumberOfCurrency(localStorage.getItem("currency"));
  cart.forEach((cartItem) => {
    sum += cartItem.count * cartItem.prices[idx].amount;
  });
  return sum.toFixed(2);
};
