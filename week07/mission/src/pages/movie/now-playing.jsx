import Poster from "../Card/Poster";
import styled from 'styled-components';
import * as S from '../style/search.style.js'
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton.jsx';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies.js";
import {useInView} from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import {ClipLoader} from "react-spinners";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination.jsx";
import { useGetMovies } from "../../hooks/queries/useGetMovies.js";
import { useQuery } from "@tanstack/react-query";

const NowPlaying = () => {
    const [page, setPage] = useState(1)
    const totalPage = 100 // 100으로 제한
    const location = useLocation()

    const { data:movies, isPending, isError } = useQuery({
        queryKey: ['movies', 'now_playing', page],
        queryFn: () => useGetMovies({ category: 'now_playing', pageParam: page }),
    });

    useEffect(()=>{
        if(location.state !== null && location.state.page)
            setPage(location.state.page)
    }, [])

    if (isPending) return (
        <S.MovieGridContainer>
        <CardListSkeleton />
    </S.MovieGridContainer>
    );

    return (
        <div>
        <Posters>
            {movies?.results.map((movie)=>(
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
        </div>
    );
};

export default NowPlaying;

const Posters = styled.div`
   display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;
