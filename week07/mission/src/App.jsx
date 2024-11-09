import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import RootLayout from "./layout/root-layout.jsx";
import LoginPage from "./pages/login.jsx";
import JoinPage from "./pages/join.jsx";
import SearchPage from "./pages/search.jsx";

import CategoryPage from "./pages/movie/category.jsx";
import NowPlaying from './pages/movie/now-playing.jsx';
import Popular from './pages/movie/popular.jsx';
import TopRated from './pages/movie/top-rated.jsx';
import Upcoming from './pages/movie/up-coming.jsx';
import DetailPage from './pages/movie/detail.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'signup',
                element: <JoinPage/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: 'movies',
                element: <CategoryPage/>
            },
        {
            path: 'movies/now-playing',
            element: <NowPlaying/>
        },
        {
            path: 'movies/popular',
            element: <Popular/>
        },
        {
            path: 'movies/top-rated',
            element: <TopRated/>
        },
        {
            path: 'movies/up-coming',
            element: <Upcoming/>
        },
        {
            path: 'movies/:id',
            element: <DetailPage/>
        }
        ]
    },

])

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        )
}

export default App
