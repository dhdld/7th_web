import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { incrementAmount, decrementAmount, clearCart }  from '../redux/cartSlice'
import { selectTotalCartQuantity, selectTotalPrice, isCartEmpty } from '../redux/cartSlice'
import { CartIcon, ChevronDown, ChevronUp } from '../constants/icons'

function Playlist() {
    const playlist = useSelector(state => state.playlist);
    const totalCartQuantity = useSelector(selectTotalCartQuantity);
    const totalPrice = useSelector(selectTotalPrice);
    const cartEmpty = useSelector(isCartEmpty);
    const dispatch = useDispatch();

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
    <ClearBtn onClick={() => dispatch(clearCart())}>장바구니 초기화</ClearBtn>
        </>
        }
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