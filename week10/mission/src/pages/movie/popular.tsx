import Poster from "../Card/Poster";
import styled from 'styled-components';
import * as S from '../style/search.style';
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton';
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

// Movie 타입 정의
interface Movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
}

const Popular = () => {
    const {
        data: movies,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isError,
        error
    } = useGetInfiniteMovies('popular');

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
        console.error("Error loading movies:", error);
        return <div>Error loading movies...</div>;
    }

    return (
        <>
            <Posters>
                {movies?.pages
                    ?.map(page => page.results)
                    ?.flat()
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

export default Popular;

const Posters = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;
