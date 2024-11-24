import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { incrementAmount, decrementAmount, clearCart }  from '../redux/cartSlice'
import { selectTotalCartQuantity, selectTotalPrice, isCartEmpty } from '../redux/cartSlice'
import { CartIcon, ChevronDown, ChevronUp } from '../constants/icons'
import { openModal, closeModal } from '../redux/modalSlice'

function Playlist() {
    const playlist = useSelector(state => state.playlist);
    const totalCartQuantity = useSelector(selectTotalCartQuantity);
    const totalPrice = useSelector(selectTotalPrice);
    const cartEmpty = useSelector(isCartEmpty);
    const showModal = useSelector(state => state.modal.showModal);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(openModal());  // 모달 열기
    };
    const confirmClearCart = () => {
        dispatch(clearCart());
        dispatch(closeModal());  // 모달 닫기
    };
    const cancelClearCart = () => {
        dispatch(closeModal());  // 모달 닫기
    };

    return (
        <>
        <Header>
            <h2>UMC PlayList</h2>
            <Cart>
                <Carticon>
                    <CartIcon />
                </Carticon>
            <TotalCnt>{totalCartQuantity}</TotalCnt>
            </Cart>
        </Header>
        <Body>
        {cartEmpty ? <p>고객님이 좋아하는 음반을 담아보세요~!</p>
        :
        <>
        <h2>당신이 선택한 음반</h2>
        
        {playlist.map(song => (
            <Music key={song.id}>
                <Img src={song.img} alt={song.title} />
                <Info>
                <Title>{song.title} | {song.singer} </Title>
                <Price>￦ {song.price}</Price> 
                 </Info> 
                 <CountDiv>
                <UpdownBtn onClick={() => dispatch(incrementAmount(song.id))}><ChevronUp /></UpdownBtn>
                 {song.amount}
                <UpdownBtn onClick={() => dispatch(decrementAmount(song.id))}><ChevronDown /></UpdownBtn>
                </CountDiv>
            </Music>
        ))}
        <hr />
        <PriceDiv>
            <p>총 가격 </p>
            <p>￦ {totalPrice}</p>
        </PriceDiv>

        <ClearBtn onClick={() => handleClearCart()}>장바구니 초기화</ClearBtn>
        </>
        }
        {showModal && (
                <Modal>
                    <ModalContent>
                        <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
                        <YesBtn onClick={confirmClearCart}>네</YesBtn>
                        <NoBtn onClick={cancelClearCart}>아니요</NoBtn>
                    </ModalContent>
                </Modal>
            )}
        </Body>
        </>
    );
}
export default Playlist;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8891F3;
    padding: 0px 250px;
    color: white;
    `
const Cart = styled.div`
    display: flex;
    cursor: pointer;
    width: 45px;
    position: relative;
`
const Carticon = styled.div`
    width: 32px;
    height: 32px;
    color: white;
`
const TotalCnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #CED3FD;
    margin-left: 5px;
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 12px;
    font-weight: bold;
`
const Body = styled.div`
width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`
const Music = styled.div`
    display: flex;
    align-items: center;
    width:  700px;
    padding: 10px;
    margin-top: 10px;
`
const Img = styled.img`
    width: 80px;
    height: 80px;
    margin-right: 20px;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    text-align: left;
`
const Title = styled.div`
    font-size: 15px;
    margin-right: 20px;
    color: #0F0C6D;
    margin-bottom: 10px;
`
const Price = styled.div`
    font-size: 15px;
    margin-right: 20px;
    color: #312EBF;
`
const CountDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`
const UpdownBtn = styled.button`
    color: #2522AD;
    font-size: 20px;
    border: none;
    cursor: pointer;
    background-color: #fff;
    width: 30px;
    margin-top: 5px;
`
const PriceDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 700px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
`
const ClearBtn = styled.button`
    width: 140px;
    height: 35px;
    background-color: #fff;
    color: red;
    border: red solid 1px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 100px;
    &:hover {
        background-color: #FFB3B3;
    }
`

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    width: 320px;
`
const YesBtn = styled.button`
    margin-right: 40px;
    background-color: white;
    color: blue;
    border: blue solid 1px;
    border-radius: 5px;
    cursor: pointer;
    width: 45px;
    height: 27px;
    &:hover {
        background-color: #B3B3FF;
    }
`
const NoBtn = styled.button`
    margin-left: 40px;
    background-color: white;
    color: red;
    border: red solid 1px;
    border-radius: 5px;
    cursor: pointer;
    width: 60px;
    height: 27px;
    &:hover {
        background-color: #FFB3B3;
    }
`