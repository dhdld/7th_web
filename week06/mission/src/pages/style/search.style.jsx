import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;

    input {
    
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap:20px;
`

export {SearchContainer, MovieGridContainer}

