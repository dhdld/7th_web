import Poster from "../Card/Poster";
import styled from 'styled-components';
import { useGetMovies } from "../../hooks/queries/useGetMovies.js";
import { useQuery } from "@tanstack/react-query";
import * as S from '../style/search.style.js'
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton.jsx';

const UpComing = () => {
    const {data:movies, isPending, isError} = useQuery({
        queryFn: ()=> useGetMovies({category:'upcoming', pageParam:1}),
        queryKey: ['movies','upcoming'],
        cacheTime: 100000,
    })
    console.log(movies)
    
    if (isPending) return (
        <S.MovieGridContainer>
        <CardListSkeleton />
    </S.MovieGridContainer>
    );

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

export default UpComing;

const Posters = styled.div`
   display: inline-flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;
`;