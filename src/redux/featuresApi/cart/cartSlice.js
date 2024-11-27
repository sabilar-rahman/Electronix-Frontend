import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
};

const calculateCartTotal = (products) => {
    const selectedItems= products.reduce((total, product) => total + product.quantity, 0);

    const totalPrice = products.reduce((total,product)=> total + product.price * product.quantity, 0);

    return {selectedItems, totalPrice};
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find(product => product._id === action.payload._id);
            // console.log(isExist);

            if(!isExist){
                state.products.push({...action.payload, quantity: 1});
            }
            else{
                toast.success("Product already added to cart");
            }
            const totals = calculateCartTotal(state.products);
            state.selectedItems = totals.selectedItems;
            state.totalPrice = totals.totalPrice;
        }
    }
});


export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
