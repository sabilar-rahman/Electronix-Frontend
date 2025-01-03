import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import authApi from './featuresApi/auth/authApi'
import authSlice from './featuresApi/auth/authSlice'
import productsApi from './featuresApi/products/productsApi'
import reviewsApi from './featuresApi/reviews/reviewsApi'
import cartReducer from './featuresApi/cart/cartSlice'
import statsApi from './featuresApi/stats/statsApi'
import ordersApi from './featuresApi/orders/ordersApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,

    cart: cartReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware, reviewsApi.middleware,statsApi.middleware,ordersApi.middleware ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export const getRootState = store.getState;
export const appDispatch = store.dispatch;