import Poster from "../Card/Poster";
import styled from "styled-components";
import * as S from "../style/search.style";
import CardListSkeleton from "../Card/Skeleton/card-list-skeleton";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
}

interface MovieResponse {
    results: Movie[];
}

const NowPlaying = () => {
    const [page, setPage] = useState<number>(1);
    const totalPage = 100; // 100으로 제한
    const location = useLocation();

    const { data: movies, isLoading, isError } = useQuery<MovieResponse, Error>({
        queryKey: ["movies", "now_playing", page],
        queryFn: () => useGetMovies({ category: "now_playing", pageParam: page }),
    });

    useEffect(() => {
        if (location.state && (location.state as { page: number }).page) {
            setPage((location.state as { page: number }).page);
        }
    }, [location]);

    if (isLoading) {
        return (
            <S.MovieGridContainer>
                <CardListSkeleton />
            </S.MovieGridContainer>
        );
    }

    if (isError) {
        return <S.MovieGridContainer>데이터를 불러오는 데 실패했습니다.</S.MovieGridContainer>;
    }

    return (
        <div>
            <Posters>
                {movies?.results.map((movie) => (
                    <Poster
                        key={movie.id}
                        id={movie.id}
                        coverImg={movie.poster_path}
                        title={movie.title}
                        release_date={movie.release_date}
                    />
                ))}
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
