import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { validateJoin } from '../utils/validate';

const JoinPage = () => {
    const navigate = useNavigate();

    const join = useForm({
        initialValue: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validate: validateJoin,
    });

    const handlePressJoin = () => {
        console.log('회원가입 정보:', join.values.email, join.values.password, join.values.passwordConfirm);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(join.errors).length === 0) {
            handlePressJoin();
        }
    }

    return (
        <Container>
            <Text>회원가입</Text>
            <Form onSubmit={onSubmit}>
                <Input 
                    type="text" 
                    placeholder="이메일을 입력해주세요!" 
                    {...join.getTextInputProps('email')} 
                />
                {join.touched.email && join.errors.email && <ErrMsg>{join.errors.email}</ErrMsg>}

                <Input 
                    type="password" 
                    placeholder="비밀번호를 입력해주세요!" 
                    {...join.getTextInputProps('password')} 
                />
                {join.touched.password && join.errors.password && <ErrMsg>{join.errors.password}</ErrMsg>}

                <Input 
                    type="password" 
                    placeholder="비밀번호를 다시 입력해주세요!" 
                    {...join.getTextInputProps('passwordConfirm')} 
                />
                {join.touched.passwordConfirm && join.errors.passwordConfirm && <ErrMsg>{join.errors.passwordConfirm}</ErrMsg>}

                <Submit
                    type="submit"
                    disabled={Object.keys(join.errors).length > 0}
                    style={{
                        backgroundColor: Object.keys(join.errors).length === 0 ? '#DC1767' : 'gray',
                        cursor: Object.keys(join.errors).length === 0 ? 'pointer' : 'auto'
                    }}
                >
                    회원가입
                </Submit>
            </Form>
        </Container>
    )
};

export default JoinPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    height: 100vh;
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
    background-color: #FCC624;
    color: white;
    font-size: 18px;
    margin-top: 20px;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 330px;
    }
`;
