import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";

const Sidebar = () => {
    return (
        <Nav>
            <Search>
                <LinkStyled to="/search">
                    <IoSearch />
                    <Text>찾기</Text>
                </LinkStyled>
            </Search>
            <Movies>
                <LinkStyled to="/movies">
                    <BiCameraMovie />
                    <Text>영화</Text>
                </LinkStyled>
            </Movies>
        </Nav>
    );
};

export default Sidebar;

const Search = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    margin: 16px;
`;

const Movies = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    margin: 16px;
`;

const Text = styled.div`
    margin-left: 10px;
`;

const LinkStyled = styled(Link)`
    font-weight: bold;
    color: white;
    :visited {
        color: #dc1767;
        text-decoration: none;
    }
    text-decoration: none;
    display: flex;
    align-items: center;
`;

const Nav = styled.div`
    background-color: #1e272e;
    align-items: center;
    min-width: 140px;
    height: 100vh;
`;
