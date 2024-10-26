import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useCustomFetch from "../../hooks/useCustomFetch";

const DetailPage = () => {
  const { id } = useParams();

  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
  } = useCustomFetch(`/movie/${id}/credits?language=ko-kr`);

  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
  } = useCustomFetch(`/movie/${id}?language=ko-KR`);

  console.log(movie);

  if (movieLoading || creditsLoading) {
    return <Container>로딩 중입니다...</Container>;
  }
  if (movieError || creditsError) {
    return <Container>데이터를 불러오는 데 실패했습니다.</Container>;
  }
  if (!movie || !credits) {
    return <Container>영화 데이터가 없습니다.</Container>;
  }

  return (
    <Container>
      <Div>
        <PosterImg
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
            <MovieInfoOverlay>
      <Title>{movie.title}</Title>
      <Rating>평균 {(movie.vote_average).toFixed(1)}</Rating>
      <ReleaseDate>{new Date(movie.release_date).getFullYear()}</ReleaseDate>
      <Runtime>{movie.runtime}분</Runtime>
      <Tagline>{movie.tagline}</Tagline>
      <Overview>{movie.overview}</Overview>
    </MovieInfoOverlay>
      </Div>

      <CastDiv>
        <CastTitle>감독/출연</CastTitle>
        <Casts>
          {credits.cast.map((castMember) => (
            <Cast key={castMember.id}>
              <ImgDiv>
                {castMember.profile_path === null ? (
                  <Img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"
                    alt="No Image"
                  />
                ) : (
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`}
                    alt={castMember.original_name}
                  />
                )}
              </ImgDiv>
              <CastName>{castMember.original_name}</CastName>
              <CastText>{castMember.known_for_department}</CastText>
            </Cast>
          ))}
        </Casts>
      </CastDiv>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PosterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Div = styled.div`
  position: relative;
  width: 85vw;  
  height: 24rem;  
  overflow: hidden;
  border-radius: 1rem;
`

const MovieInfoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2rem;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 0.5rem;
`;

const Rating = styled.p`
  font-size: 1rem;
margin:0rem;
`;

const ReleaseDate = styled.p`
  font-size: 1rem;
  margin:0rem;
`;

const Runtime = styled.p`
  font-size: 1rem;
  margin:0rem;
`;

const Tagline = styled.p`
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1rem;
  max-width: 60%;  
  line-height: 1.5;
`;

const CastDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0 0 15px;
    @media (max-width: 768px) {
        margin-left: 50px;
        margin-right: 50px;
        height: auto;
    }
    `
const CastTitle = styled.p`
font-size: 1.3rem;
font-weight: 500;
margin-bottom: 30px;
`

    const Casts = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows:120px;
    font-size: 0.8rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
    `

const Cast = styled.div`
display: flex;
flex-direction: column;
padding: 0px;
    width: 125px;
    text-align: center;
    `

const ImgDiv = styled.div`
display: flex;
    margin:0;
    justify-content: center;
    `
const Img = styled.div`
display: flex;
    background-image: url(${props => props.src});
    width: 60px;
    height: 60px;    
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    `

const CastName = styled.p`
    font-size: 0.9rem;
    margin: 1px;
    padding: 0px;
    `

const CastText = styled.p`
    font-size: 0.8rem;
    margin: 1px;
    padding: 0px;
    color: #a5a5a5;
    `