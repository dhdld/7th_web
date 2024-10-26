import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isTouched, setIsTouched] = useState(false); 

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onChangeId = (e) => {
        setIsTouched(true);
        const inputValue = e.target.value;
        setId(inputValue);

        if (inputValue.length === 0) {
            setIdMessage('이메일을 입력해주세요.');
            setIsId(false);
        } else if (!validateEmail(inputValue)) {
            setIdMessage('유효한 이메일 형식을 입력해주세요.');
            setIsId(false);
        } else {
            setIdMessage('');
            setIsId(true);
        }
    };

    const onChangePassword = (e) => {
        setIsTouched(true)
        setPassword(e.target.value)
        if(e.target.value === '') {
            setPasswordMessage('비밀번호를 입력해주세요.')
            setIsPassword(false)
        } else if(e.target.value.length < 8 || e.target.value.length > 16) {
            setPasswordMessage('비밀번호는 8~16자 사이로 입력해주세요.')
            setIsPassword(false)
        }
        else {
            setPasswordMessage('')
            setIsPassword(true)
        }
    }

    const onSubmit = (e) => {
        if(isId && isPassword) {
            e.preventDefault();
        }
        else {
            if(id === '') {
                setIdMessage('이메일을 입력해주세요.')
            }
            if(password === '') {
                setPasswordMessage('비밀번호를 입력해주세요.')
            }
        }
    }

    return (
            <Container>
            <Text>로그인</Text>
                <Form onSubmit={onSubmit}>
                <Input type="text" placeholder="이메일을 입력해주세요!" value={id} onChange={onChangeId}/>
            <ErrMsg>{idMessage}</ErrMsg>
                <Input type="password" placeholder="비밀번호를 입력해주세요!" value={password} onChange={onChangePassword}/>
            <ErrMsg>{passwordMessage}</ErrMsg>
            <Submit disabled={!(isId && isPassword)}
            style={{
                backgroundColor: !isTouched
                    ? '#DC1767'
                    : isId && isPassword
                    ? '#DC1767' // 모든 조건 충족 시 색상
                    : 'gray', // 조건 불충족 시 색상
                cursor: isId && isPassword ? 'pointer' : 'auto' // 조건 충족 시 pointer, 불충족 시 auto
            }}>
                로그인</Submit> 
                </Form>
            </Container>
    );
}

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 100vh;
    padding-top: 90px;
    `
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const Text = styled.p`
    font-size: 26px;
    font-weight: bold;
    `

const Input = styled.input`    
width: 400px;
height: 30px;
border: none;
border-radius: 8px;
font-size: 15px;
padding: 7px 20px;
margin: 10px;
&:focus {
    outline: none;
}
@media (max-width: 768px) {
    width: 290px;
}
    `
    const ErrMsg = styled.div`
    color: red;
    font-size: 12px;
    text-align: left;
    width: 400px;
    `

const Submit = styled.button`
    width: 440px;
    height: 50px;
    padding: 7px 20px;
    border: none;
    border-radius: 8px;
    background-color: #DC1767;
    color: white;
    font-size: 18px;
    margin-top: 20px;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 330px;
    }    
`

