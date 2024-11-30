import { create } from 'zustand';
import cartItems from '../constants/cartItems';

const calculateInitialTotals = (items) => {
    return items.reduce(
        (acc, item) => ({
            amount: acc.amount + item.amount,
            total: acc.total + item.amount * item.price,
        }),
        { amount: 0, total: 0 }
    );
};

const initialTotals = calculateInitialTotals(cartItems);

const useStore = create((set, get) => ({
    cart: {
        cartItems,
        amount: initialTotals.amount,
        total: initialTotals.total,
    },
    modal: {
        isOpen: false,
    },
    increase: (id) => {
        set((state) => {
            const updatedItems = state.cart.cartItems.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: item.amount + 1 };
                }
                return item;
            });
            return { cart: { ...state.cart, cartItems: updatedItems } };
        });
        get().calculateTotals();
    },
    decrease: (id) => {
        set((state) => {
            const updatedItems = state.cart.cartItems
                .map((item) => {
                    if (item.id === id) {
                        if (item.amount === 1) return null;
                        return { ...item, amount: item.amount - 1 };
                    }
                    return item;
                })
                .filter((item) => item !== null);
            return { cart: { ...state.cart, cartItems: updatedItems } };
        });
        get().calculateTotals();
    },
    calculateTotals: () => {
        const { cartItems } = get().cart;
        const totals = cartItems.reduce(
            (acc, item) => ({
                amount: acc.amount + item.amount,
                total: acc.total + item.amount * item.price,
            }),
            { amount: 0, total: 0 }
        );
        set((state) => ({ cart: { ...state.cart, ...totals } }));
    },
    clearCart: () => {
        set(() => ({
            cart: { cartItems: [], amount: 0, total: 0 },
        }));
    },
    openModal: () => set(() => ({ modal: { isOpen: true } })),
    closeModal: () => set(() => ({ modal: { isOpen: false } })),
}));

export default useStore;