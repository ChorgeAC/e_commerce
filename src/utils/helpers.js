export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number);
  return newNumber;
};

export const getUniqueValues = (products, type) => {
  const result = products.map((product) => product[type]);
  if (type === "colors") {
    return ["all", ...new Set([...result.flat()])];
  }
  return ["all", ...new Set([...result])];
};
