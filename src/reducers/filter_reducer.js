import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const priceArr = action.payload.map((product) => product.price);
    const maxPrice = Math.max(...priceArr);
    return {
      ...state,
      filteredProducts: [...action.payload],
      allProducts: [...action.payload],
      filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort } = state;
    const tempProd = [...state.filteredProducts];
    if (sort === "price-lowest") {
      tempProd.sort((a, b) => a.price - b.price);
    } else if (sort === "price-highest") {
      tempProd.sort((a, b) => b.price - a.price);
    } else if (sort === "name-a") {
      tempProd.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-z") {
      tempProd.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filteredProducts: tempProd };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: state.filters.maxPrice,
        minPrice: 0,
        price: state.filters.maxPrice,
        shipping: false,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    let tempProduct = [...allProducts];
    const { text, category, company, color, price, maxPrice, shipping } =
      state.filters;
    if (text) {
      tempProduct = tempProduct.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.category === category;
      });
    }
    if (company !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.company === company;
      });
    }
    if (color !== "all") {
      tempProduct = tempProduct.filter((product) => {
        return product.colors.includes(color);
      });
    }
    if (price !== maxPrice) {
      tempProduct = tempProduct.filter((product) => {
        return product.price <= price;
      });
    }
    if (shipping) {
      tempProduct = tempProduct.filter((product) => {
        return product.shipping === true;
      });
    }
    return { ...state, filteredProducts: tempProduct };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
