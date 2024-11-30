import axiosInstance from '../../apis/axiosInstance';

const useGetMovies = async ({ category, pageParam }) => {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-kr&page=${pageParam}`)
    return data;
}

const useGetMovieDetail = async ({ movieId }) => {
    const { data } = await axiosInstance.get(`/movie/${movieId}?language=ko-kr`)
    return data;
}

const useGetMovieCredit = async ({ movieId }) => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/credits?language=ko-kr`)
    return data;
}

export { useGetMovies, useGetMovieDetail, useGetMovieCredit };