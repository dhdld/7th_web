import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;

    input {
        flex:1;
    }

    button {
    width: 80px;
    background-color: #f82e62;
    color: white;
    cursor: pointer;
    }
`

const MovieGridContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap:20px;
`

export { SearchContainer, MovieGridContainer }

