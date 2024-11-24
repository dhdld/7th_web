import { configureStore } from '@reduxjs/toolkit'
import playlistSlice from './cartSlice'
import modalSlice from './modalSlice'

export default configureStore({
    reducer: {
        playlist: playlistSlice,
        modal: modalSlice
    }
})