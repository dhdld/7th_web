import axiosInstance from '../../apis/axiosInstance';

// 공통 타입 정의
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface MovieDetail extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
}

interface MovieCredit {
    cast: {
        id: number;
        original_name: string;
        known_for_department: string;
        profile_path: string | null;
    }[];
    crew: {
        id: number;
        name: string;
        job: string;
        department: string;
    }[];
}

// 영화 목록 조회
const useGetMovies = async ({
    category,
    pageParam,
}: {
    category: string;
    pageParam?: number;
}): Promise<MovieResponse> => {
    const { data } = await axiosInstance.get<MovieResponse>(
        `/movie/${category}?language=ko-kr&page=${pageParam}`
    );
    return data;
};

// 영화 상세 정보 조회
const useGetMovieDetail = async ({
    movieId,
}: {
    movieId: number;
}): Promise<MovieDetail> => {
    const { data } = await axiosInstance.get<MovieDetail>(
        `/movie/${movieId}?language=ko-kr`
    );
    return data;
};

// 영화 크레딧 정보 조회
const useGetMovieCredit = async ({
    movieId,
}: {
    movieId: number;
}): Promise<MovieCredit> => {
    const { data } = await axiosInstance.get<MovieCredit>(
        `/movie/${movieId}/credits?language=ko-kr`
    );
    return data;
};

export { useGetMovies, useGetMovieDetail, useGetMovieCredit };
