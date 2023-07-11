import React from "react";

type Props = {
    item: any;
};

const ItemCard = ({ item }: Props) => {
    return (
        <div key={item.id} className="bg-prim p-l round-x">
            ItemCard: {item.name}
        </div>
    );
};

export default ItemCard;
