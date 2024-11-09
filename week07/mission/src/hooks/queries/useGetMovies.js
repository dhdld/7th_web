import axiosInstance from '../../apis/axiosInstance';

const useGetMovies = async ({ category, pageParam }) => {
    const { data } = await axiosInstance.get(`/movie/${category}?language=ko-kr&page=${pageParam}`)

    return data;
}

export { useGetMovies };