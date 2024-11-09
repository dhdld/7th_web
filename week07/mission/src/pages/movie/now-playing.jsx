import Poster from "../Card/Poster";
import styled from 'styled-components';
import * as S from '../style/search.style.js'
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton.jsx';
import { useGetMovies } from "../../hooks/queries/useGetMovies.js";
import { useQuery } from "@tanstack/react-query";

const NowPlaying = () => {
    const {data:movies, isPending, isError} = useQuery({
        queryFn: ()=> useGetMovies({category:'now_playing', pageParam:1}),
        queryKey: ['movies','now_playing'],
        cacheTime: 100000,
    })
    console.log(movies)
    
    if (isPending) return (
        <S.MovieGridContainer>
        <CardListSkeleton />
    </S.MovieGridContainer>
    );

    if (isError) return <div>Error loading movies</div>;

    return (
        <Posters>
            {movies?.results?.length > 0 ? (
                movies.results.map((movie) => (
                    <Poster 
                        key={movie.id} 
                        id={movie.id} 
                        coverImg={movie.poster_path} 
                        title={movie.title} 
                        release_date={movie.release_date} 
                    />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </Posters>
    );
};

export default NowPlaying;

const Posters = styled.div`
   display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;
