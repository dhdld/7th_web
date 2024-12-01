import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useGetMovies } from "./useGetMovies";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

interface MovieResponse {
    results: Movie[];
}

// useGetMovies의 반환 타입 명시
type UseGetMoviesFn = (args: { category: string; pageParam?: number }) => Promise<MovieResponse>;

function useGetInfiniteMovies(category: string) {
    return useInfiniteQuery<MovieResponse, Error>({
        queryFn: ({ pageParam }: QueryFunctionContext) =>
            useGetMovies({ category, pageParam }) as ReturnType<UseGetMoviesFn>, // 타입을 명확히 지정
        queryKey: ['movies', category],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const lastMovie = lastPage.results.slice(-1)[0]; // .at(-1) 대신 .slice(-1)[0] 사용
            return lastMovie ? allPages?.length + 1 : undefined;
        },
    });
}

export { useGetInfiniteMovies };
