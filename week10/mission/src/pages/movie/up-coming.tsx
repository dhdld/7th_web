import Poster from "../Card/Poster";
import styled from "styled-components";
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import * as S from "../style/search.style";
import CardListSkeleton from "../Card/Skeleton/card-list-skeleton";
import { ClipLoader } from "react-spinners";

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
}

const UpComing = () => {
    const {
        data: movies,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
        error,
        isError,
    } = useGetInfiniteMovies("upcoming");

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    console.log(movies);

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
        <>
            <Posters>
                {movies?.pages
                    ?.flatMap((page) => page.results)
                    ?.map((movie: Movie) => (
                        <Poster
                            key={movie.id}
                            id={movie.id}
                            coverImg={movie.poster_path}
                            title={movie.title}
                            release_date={movie.release_date}
                        />
                    ))}
                {isFetching && <CardListSkeleton />}
                <div ref={ref}>
                    {isFetching && <ClipLoader color="#fff" />}
                </div>
            </Posters>
        </>
    );
};

export default UpComing;

const Posters = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;
