import Lottie from "lottie-react";
import React from "react";
import noData from "../../old/lotties/noData.json";
import { ILang, Lang } from "@/Lang";

let Titles = {
    items: "ThereIsNoItems",
    bzns: "ThereAreNoBusinesses",
    accounts: "ThereAreAccounts",
    customers: "ThereAreAccounts",
    "business-transactions": "ThereAreNoMovements",
};

interface Props {
    service: any;
    label: ILang;
}

const NoContent = ({ service, label = "ThereIsNoData" }: Props) => {
    return (
        <div className="flex col-span-full flex-col items-center justify-center m-auto">
            <Lottie className="max-w-xl" animationData={noData} />
            <p className="font-bold text-2xl text-owl pt-6">{Lang[label]}</p>
        </div>
    );
};

export default React.memo(NoContent);
