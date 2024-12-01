import styled from 'styled-components';

interface PaginationProps {
    setPage: (page: number) => void;
    current: number;
    total: number;
}

export default function Pagination({ setPage, current, total }: PaginationProps) {
    const before = () => {
        if (current === 1) return;
        setPage(current - 1);
    };

    const after = () => {
        if (current === total) return;
        setPage(current + 1);
    };

    return (
        <Paging>
            {current === 1 ? (
                <DisabledButton onClick={before}>이전</DisabledButton>
            ) : (
                <ChangeButton onClick={before}>이전</ChangeButton>
            )}
            <Current>{current}페이지</Current>
            <ChangeButton onClick={after}>다음</ChangeButton>
        </Paging>
    );
}

const Paging = styled.div`
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 20px;
    align-items: center;
`;

const ChangeButton = styled.button`
    width: 75px;
    height: 40px;
    border: none;
    background-color: #dc1767;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
`;

const DisabledButton = styled(ChangeButton)`
    cursor: default;
    background-color: white;
    color: black;
`;

const Current = styled.div`
    border: none;
    font-size: 21px;
`;
