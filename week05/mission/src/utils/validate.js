const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateUser(values) {
    const errors = {};

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

function validateLogin(values) {
    return validateUser(values);
}

function validateJoin(values) {
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
