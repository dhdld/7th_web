import {useEffect, useState} from "react";
import Poster from "./Poster";
import styled from 'styled-components';
import useCustomFetch from "../hooks/useCustomFetch";

const NowPlaying = () => {
    const { data: movies, isLoading, isError } = useCustomFetch(`/movie/now_playing?language=ko-kr&page=1`);
    console.log(movies);
    
    if (isLoading) return <div>Loading...</div>;
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
