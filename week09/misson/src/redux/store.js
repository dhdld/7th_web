import { configureStore } from '@reduxjs/toolkit'
import playlistSlice from './cartSlice'

export default configureStore({
    reducer: {
        playlist: playlistSlice
    }
})