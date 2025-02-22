export const ENDPOINTS = {
    MENU: {
      STARTER: "/api/admin/menu/starter",
      MAIN_COURSE: "/api/admin/menu/main_course",
      DESSERT: "/api/admin/menu/dessert",
      ALL_MENU: "/api/admin/menu",
    },
    SESSION: {
       GETSESSION: "/api/customer/getsession"
    },
    CART: {
      ADDTOCART: "/api/customer/cart/add",
      REMOVEFROMCART: "/api/customer/cart/remove",
      FETCHFROMCART: "/api/customer/getCartItems"
    },
    ORDERS: {
      PLACEORDER: "/api/customer/order/placeorder"
    }
  } 