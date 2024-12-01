import Poster from '../Card/Poster';
import { useSearchParams } from 'react-router-dom';
import useCustomFetch from '../../hooks/useCustomFetch';
import * as S from '../style/search.style';
import CardListSkeleton from '../Card/Skeleton/card-list-skeleton';

// Movie 타입 정의
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface MovieSearchResponse {
    results: Movie[];
}

const SearchMovieList = () => {
    const [searchParams] = useSearchParams({
        mq: '',
    });

    const mq = searchParams.get('mq');

    const {
        data: movies,
        isLoading,
        isError,
    } = useCustomFetch<MovieSearchResponse>(`/search/movie?query=${mq}&language=ko-KR`);

    console.log(movies);

    if (mq && movies?.results?.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <h1 style={{ color: 'white' }}>
                    검색어 {mq}에 해당하는 데이터가 없습니다.
                </h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <S.MovieGridContainer>
                <CardListSkeleton />
            </S.MovieGridContainer>
        );
    }

    return (
        <S.MovieGridContainer>
            {movies?.results?.length > 0
                ? movies.results.map((movie) => (
                      <Poster
                          key={movie.id}
                          id={movie.id}
                          coverImg={movie.poster_path}
                          title={movie.title}
                          release_date={movie.release_date}
                      />
                  ))
                : null}
        </S.MovieGridContainer>
    );
};

export default SearchMovieList;
