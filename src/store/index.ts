import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export interface State {
  persistedState: ShoppingCart;
  isDrawerOpen: boolean,
  search:string
}

export interface ShoppingCart {
  shoppingCart : Array<ProductCart>,

}

export interface ProductCart {
  amount:number,
  product_name:string,
  product_img:string,
  product_id:string,
  price:number
}


export default createStore<State>({
  state: {
    persistedState:{
      shoppingCart : []
    },
    isDrawerOpen:false,
    search:""
  },
  getters: {
    getisDrawerOpen: (state:State) : boolean => state.isDrawerOpen,
    getShoppingCart: (state:State) : Array<ProductCart> => state.persistedState.shoppingCart,
    getTotalShoppingCart: (state:State) : number => state.persistedState.shoppingCart.length ? 
    state.persistedState.shoppingCart.map(item => (item.price * item.amount)).reduce((prev, next) => prev + next) : 0,
    getCountShoppingCart: (state:State) : number => state.persistedState.shoppingCart.length ? 
    state.persistedState.shoppingCart.map(item => Number(item.amount)).reduce((prev, next) => prev + next) : 0,
    getSearch: (state:State) :string => state.search
  },
  mutations: {
    addProduct : (state:State,product:ProductCart) => {
      state.persistedState.shoppingCart.push(product);

      const reduceShoppingCart : Array<ProductCart> = [...state.persistedState.shoppingCart.reduce((r, p) => {
          const key = p.product_id;

          const item = r.get(key) || Object.assign({}, p, {
            amount: 0,
          });
          
          item.amount += Number(p.amount);

          return r.set(key, item);
      }, new Map).values()];

      state.persistedState.shoppingCart = reduceShoppingCart;
    },
    toggleDrawer : (state:State,open:boolean) => state.isDrawerOpen = open,
    deleteProductOfShoppingCart : (state:State,id:string) => state.persistedState.shoppingCart = state.persistedState.shoppingCart.filter((item) => item.product_id !== id),
    payShoppingCart : (state:State) => state.persistedState.shoppingCart = [],
    searchProduct :(state:State,value:string) => state.search = value,
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['persistedState'],
    }),
  ],
})
