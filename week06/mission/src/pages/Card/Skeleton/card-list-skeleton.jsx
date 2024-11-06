import CardSkeleton from "./card-skeleton";

const CardListSkeleton = () => {
    return(
        new Array(20).fill(0).map(()=> <CardSkeleton />)
    )
}

export default CardListSkeleton;