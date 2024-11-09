import Poster from "../Card/Poster";
import styled from 'styled-components';
import * as S from '../style/search.style.js'
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton.jsx';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import {useInView} from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import {ClipLoader} from "react-spinners";
import axiosInstance from "../../apis/axiosInstance.jsx";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination.jsx";

const NowPlaying = () => {
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const totalPage = 100 // 100으로 제한
    const location = useLocation()

    const getMovies = async () => {
        const { data } = await axiosInstance.get(`/movie/now_playing?language=ko-kr&page=${page}`)
        setMovies(data.results)
        setLoading(false)
    }

    useEffect(()=>{
        getMovies()
        setLoading(false)
    }, [page])

    useEffect(()=>{
        getMovies()
        if(location.state !== null && location.state.page)
            setPage(location.state.page)
    }, [])

    return (
        <Container>
        <Posters>
            {movies?.map((movie)=>(
                    <Poster 
                    key={movie.id} 
                    id={movie.id} 
                    coverImg={movie.poster_path} 
                    title={movie.title} 
                    release_date={movie.release_date} 
                />
                )
            )}
        </Posters>
        <Pagination setPage={setPage} current={page} total={totalPage} />
        </Container>
    );
};

export default NowPlaying;

const Container = styled.div`
`

const Posters = styled.div`
   display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;
