const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 유효성 검증 값 타입 정의
interface UserValues {
    email: string;
    password: string;
    passwordConfirm?: string; // 회원가입 시 추가로 사용
}

// 에러 타입 정의
interface ValidationErrors {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

function validateUser(values: UserValues): ValidationErrors {
    const errors: ValidationErrors = {};

    // 이메일 유효성 검증
    if (!values.email) {
        errors.email = '이메일을 입력해주세요.';
    } else if (!emailPattern.test(values.email)) {
        errors.email = '이메일 형식이 올바르지 않습니다.';
    }

    // 비밀번호 유효성 검증
    if (!values.password) {
        errors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 8 || values.password.length > 16) {
        errors.password = '비밀번호는 8~16자 사이로 입력해주세요.';
    }

    return errors;
}

function validateLogin(values: UserValues): ValidationErrors {
    return validateUser(values);
}

function validateJoin(values: UserValues): ValidationErrors {
    const errors = validateUser(values);

    // 비밀번호 확인 유효성 검증
    if (!values.passwordConfirm) {
        errors.passwordConfirm = '비밀번호를 다시 입력해주세요.';
    } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
}

export { validateLogin, validateJoin };
