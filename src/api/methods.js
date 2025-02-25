import instance from "./instance";
import { ENDPOINTS } from "./endpoint";

export const API = {
  menu: {
    getStarters: () => instance.get(ENDPOINTS.MENU.STARTER),
    getMainCourse: () => instance.get(ENDPOINTS.MENU.MAIN_COURSE),
    getDesserts: () => instance.get(ENDPOINTS.MENU.DESSERT),
    getAllMenu: () => instance.get(ENDPOINTS.MENU.ALL_MENU),
  },
  session: {
    getSession: (data) =>
      instance.post(
        ENDPOINTS.SESSION.GETSESSION,
        { tableNumber: data.tableNumber } // Ensure data is properly structured
      ),
  },
  cart: {
    addToCart: (data) =>
      instance.post(ENDPOINTS.CART.ADDTOCART, {
        sessionToken: data.sessionToken,
        dishId: data.dishId,
        quantity: data.quantity,
      }),
    removeFromCart: (data) =>
      instance.post(ENDPOINTS.CART.REMOVEFROMCART, {
        sessionToken: data.sessionToken,
        dishId: data.dishId,
      }),
    fetchFromCart: (data) =>
      instance.post(ENDPOINTS.CART.FETCHFROMCART, {
        sessionToken: data.sessionToken,
      }),
  },
  orders: {
    placeorder: (data) => {
      instance.post(ENDPOINTS.ORDERS.PLACEORDER, {
        sessionToken: data.sessionToken,
        items: data.items,
        total: data.total,
      });
    },
  },
  categories: {
    getmenu: () => instance.get(ENDPOINTS.CATEGORIES.GETMENU),
  },
};
