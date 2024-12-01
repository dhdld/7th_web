import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    email: string;
    nickname: string;
}

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null); // 사용자 타입 정의
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get<User>('http://localhost:3000/user/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const nickname = response.data.email.split('@')[0];
                    setUser({ ...response.data, nickname });
                } catch (error) {
                    console.error('사용자 정보를 가져오는데 실패했습니다:', error);
                    // 토큰이 유효하지 않거나 오류가 발생하면 로그아웃 처리
                    handleLogout();
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = (): void => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/');
    };

    return (
        <Nav>
            <Logo>
                <LinkStyled to="/">YONGCHA</LinkStyled>
            </Logo>
            <SignDiv>
                {user ? (
                    <>
                        <UserEmail>{user.nickname}님 반갑습니다.</UserEmail>
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    </>
                ) : (
                    <>
                        <Login>
                            <LinkStyled to="/login">로그인</LinkStyled>
                        </Login>
                        <Join>
                            <LinkStyled to="/signup">회원가입</LinkStyled>
                        </Join>
                    </>
                )}
            </SignDiv>
        </Nav>
    );
};

export default Navbar;

const UserEmail = styled.span`
    color: #fff;
    font-size: 1rem;
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
`;

const Logo = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin-left: 20px;
    :visited {
        color: #dc1767;
        text-decoration: none;
    }
`;

const LinkStyled = styled(Link)`
    font-weight: bold;
    color: white;
    :visited {
        color: #dc1767;
        text-decoration: none;
    }
    text-decoration: none;
`;

const Nav = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background-color: #1e272e;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 12px;
`;

const SignDiv = styled.div`
    margin-right: 60px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
`;

const Login = styled.div`
    margin-right: 20px;
    padding: 8px;
    border-radius: 7px;
    &:hover {
        background-color: black;
    }
`;

const Join = styled.div`
    background-color: #dc1767;
    border-radius: 7px;
    padding: 8px;
    &:hover {
        background-color: lightcoral;
    }
`;