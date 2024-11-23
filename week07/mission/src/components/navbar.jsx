import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/user/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
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

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/');
    };

    return (
        <Nav>
            <Logo><Linkk to={'/'}>YONGCHA</Linkk></Logo>
            <SignDiv>
                {user ? (
                    <>
                        <UserEmail>{user.nickname}님 반갑습니다.</UserEmail>
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    </>
                ) : (
                    <>
                        <Login><Linkk to={'/login'}>로그인</Linkk></Login>
                        <Join><Linkk to={'/signup'}>회원가입</Linkk></Join>
                    </>
                )}
            </SignDiv>
        </Nav>
    );
};

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

export default Navbar;

const Logo = styled.div`
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin-left: 20px;
    :visited {
        color: #DC1767;
        text-decoration: none;
    }
`;

const Linkk = styled(Link)`
    font-weight: bold;
    color: white;
    :visited {
        color: #DC1767;
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
    background-color: #DC1767;
    border-radius: 7px;
    padding: 8px;
    &:hover {
    background-color: lightcoral;
    }
`;