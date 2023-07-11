import Lottie from "lottie-react";
import React from "react";
import noData from "../../old/lotties/noData.json";
import { Lang } from "@/Lang";

let Titles = {
    items: "ThereIsNoItems",
    bzns: "ThereAreNoBusinesses",
    accounts: "ThereAreAccounts",
    my_accounts: "ThereAreAccounts",
    "business-transactions": "ThereAreNoMovements",
};

const EmptyList = ({ service }) => {
    const title = Titles[service.id] || "ThereIsNoData";
    return (
        <div className="flex col-span-full flex-col items-center justify-center m-auto">
            <Lottie className="max-w-xl" animationData={noData} />
            <p className="font-bold text-2xl text-owl pt-6">{Lang[title]}</p>
        </div>
    );
};

export default React.memo(EmptyList);
