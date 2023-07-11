import React from "react";
import ItemsService from "./items/ItemsService";
import Button from "../components/Button";
import { PagenatedContainer, Grid, ReactStateBuilder, ServiceStateBuilder } from "morabaa-services";
import { PopupMe } from "morabaa-provider";

const Demo = () => {
    const itemsService = React.useMemo(() => new ItemsService(), []);

    return (
        <div>
            <div className="row gap-l p-l">
                <Button
                    label="show popup"
                    style={
                        {
                            // marginTop: 600,
                        }
                    }
                    onClick={itemsService.popupAddItem}
                />

                {/* <Button label="loading" onClick={() => itemsService.setState("loading")} />
                <Button label="processing" onClick={() => itemsService.setState("processing")} />
            <Button label="error" onClick={() => itemsService.setState("error")} /> */}
            </div>
            <div id="am-for-popup-two" className="bg-green p-l" />
            <ServiceStateBuilder service={itemsService} />
        </div>
    );
};

export default Demo;

interface AmPopupProps {
    label: string;
    onClick: () => void;
}
export const AmPopup = ({ label, onClick }: AmPopupProps) => {
    return (
        <div className="bg-prim p-l">
            <input type="text" />
            <p>{label}</p>
            <p>am popup</p>
            <Button label="save" onClick={onClick} />
        </div>
    );
};
