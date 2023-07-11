import React from "react";

type Props = {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
};

const Button = ({ label, onClick, style }: Props) => {
    return (
        <div className="button" onClick={onClick} style={style}>
            {label}
        </div>
    );
};

export default Button;
