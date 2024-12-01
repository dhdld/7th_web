import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import api from '../apis/tokenAPI';

interface JoinFormValues {
    email: string;
    password: string;
    passwordConfirm: string;
}

const JoinPage = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('유효한 이메일 형식을 입력해주세요.')
            .required('이메일을 반드시 입력해주세요.'),
        password: yup
            .string()
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .max(16, '비밀번호는 16자 이하여야 합니다.')
            .required('비밀번호를 반드시 입력해주세요.'),
        passwordConfirm: yup
            .string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 확인을 입력해주세요.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JoinFormValues>({
        resolver: yupResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: (data: JoinFormValues) => api.post('/auth/register', data),
        onSuccess: () => {
            console.log('회원가입 성공');
            navigate('/login');
        },
        onError: (error: any) => {
            if (error.response) {
                console.error('회원가입 실패:', error.response.data.message);
            } else if (error.request) {
                console.error('서버 응답이 없습니다.');
            } else {
                console.error('오류 발생:', error.message);
            }
        },
    });

    const onSubmit: SubmitHandler<JoinFormValues> = (data) => {
        const payload = {
            email: data.email,
            password: data.password,
            passwordCheck: data.passwordConfirm,
        };
        mutation.mutate(payload);
    };

    return (
        <Container>
            <Text>회원가입</Text>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    {...register('email')}
                    placeholder="이메일을 입력해주세요!"
                />
                {errors.email && <ErrMsg>{errors.email.message}</ErrMsg>}

                <Input
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호를 입력해주세요!"
                />
                {errors.password && <ErrMsg>{errors.password.message}</ErrMsg>}

                <Input
                    type="password"
                    {...register('passwordConfirm')}
                    placeholder="비밀번호를 다시 입력해주세요!"
                />
                {errors.passwordConfirm && <ErrMsg>{errors.passwordConfirm.message}</ErrMsg>}

                <Submit type="submit">회원가입</Submit>
            </Form>
        </Container>
    );
};

export default JoinPage;

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
    background-color: #dc1767;
    color: white;
    font-size: 18px;
    margin-top: 20px;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 330px;
    }
`;
