import { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as S from './style/search.style';
import SearchMovieList from './movie/search-movie-list';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('');

    const [searchParams] = useSearchParams({
        mq: '',
    });

    const mq = searchParams.get('mq');

    const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    const handleSearchWithKeyBoard = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <Container>
            <S.SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="영화 제목을 입력하세요"
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handleSearchWithKeyBoard}
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </S.SearchContainer>
            <SearchMovieList />
        </Container>
    );
};

export default SearchPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    outline: none;
`;

const SearchButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-left: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    outline: none;

    &:hover {
        background-color: #0056b3;
    }
`;
