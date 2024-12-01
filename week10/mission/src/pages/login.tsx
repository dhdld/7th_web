import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { validateLogin } from '../utils/validate';
import { useMutation } from '@tanstack/react-query';
import api from '../apis/tokenAPI';

interface LoginValues {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

const LoginPage = () => {
    const navigate = useNavigate();

    const login = useForm<LoginValues>({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin,
    });

    // useMutation으로 로그인 요청 처리
    const mutation = useMutation<LoginResponse, any, LoginValues>({
        mutationFn: (data) => api.post('/auth/login', data),
        onSuccess: (data) => {
            console.log('로그인 성공:', data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            navigate('/');
        },
        onError: (error: any) => {
            if (error.response) {
                console.error('로그인 실패:', error.response.data.message);
            } else if (error.request) {
                console.error('서버 응답이 없습니다.');
            } else {
                console.error('오류 발생:', error.message);
            }
        },
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.keys(login.errors).length === 0) {
            const payload = {
                email: login.values.email,
                password: login.values.password,
            };
            mutation.mutate(payload); // useMutation 실행
        }
    };

    return (
        <Container>
            <Text>로그인</Text>
            <Form onSubmit={onSubmit}>
                <Input
                    type="text"
                    placeholder="이메일을 입력해주세요!"
                    {...login.getTextInputProps('email')}
                />
                {login.touched.email && login.errors.email && <ErrMsg>{login.errors.email}</ErrMsg>}

                <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    {...login.getTextInputProps('password')}
                />
                {login.touched.password && login.errors.password && <ErrMsg>{login.errors.password}</ErrMsg>}

                <Submit
                    type="submit"
                    disabled={Object.keys(login.errors).length > 0}
                    style={{
                        backgroundColor: Object.keys(login.errors).length === 0 ? '#DC1767' : 'gray',
                        cursor: Object.keys(login.errors).length === 0 ? 'pointer' : 'auto',
                    }}
                >
                    로그인
                </Submit>
            </Form>
        </Container>
    );
};

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 90px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    font-size: 26px;
    font-weight: bold;
`;

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
`;

const ErrMsg = styled.div`
    color: red;
    font-size: 12px;
    text-align: left;
    width: 400px;
`;

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
`;
