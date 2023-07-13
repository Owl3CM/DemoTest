import React from "react";

type Props = {
    item: any;
};

const ItemCard = ({ item }: Props) => {
    return (
        <div key={item.id} className="bg-prim p-l round-x">
            <h1>ItemCard: {item.name}</h1>
            <p>Businsess Id: {item.businessId}</p>
        </div>
    );
};

export default ItemCard;
