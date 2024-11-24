import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../constants/cartItems';

let nextId = 0;
const initialState = cartItems.map(item => ({
    ...item,
    id: nextId++,
    amount: 1,
    inCart: true  // 장바구니 추가 여부
}));

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        incrementAmount: (state, action) => {
            const song = state.find(song => song.id === action.payload);
            if (song) {
                song.amount += 1;
                song.inCart = true;
            }
        },
        decrementAmount: (state, action) => {
            const index = state.findIndex(song => song.id === action.payload);
            if (index !== -1 && state[index].amount > 1) {
                state[index].amount -= 1;
            } else if (index !== -1 && state[index].amount === 1) {
                state.splice(index, 1);
            }
        },
        clearCart: (state) => {
            return state.filter(song => !song.inCart);
        }
    }
});

export const { incrementAmount, decrementAmount, clearCart } = playlistSlice.actions;

export default playlistSlice.reducer;

export const selectTotalCartQuantity = (state) =>
    state.playlist.reduce((total, item) => item.inCart ? total + item.amount : total, 0);

export const selectTotalPrice = (state) =>
    state.playlist.reduce((total, item) => {
        if (item.inCart) {
            return total + item.price * item.amount;
        }
        return total;
    }, 0);

export const isCartEmpty = (state) =>
    state.playlist.every(song => !song.inCart);