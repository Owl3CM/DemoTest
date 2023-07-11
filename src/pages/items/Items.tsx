import React from "react";
import { MorabaaClient } from "../../MorabaaClient";
import { PagenatedContainer, Grid, ReactStateBuilder, ServiceStateBuilder } from "morabaa-services";
import ItemCard from "./components/ItemCard";
import ItemsService, { IItemsService } from "./ItemsService";
import QueryBuilder from "../../QueryBuilder";
const token = "kqHrOdtZmAOjI8ZC93ftc1bp8GMsire1rXGwf6e8ayESJyUU";
MorabaaClient.Authorization(token);

type Props = {};

const Items = (props: Props) => {
    const service = React.useMemo(() => new ItemsService(), []);
    const queryBuilder = new QueryBuilder<any>({ onQueryChange: service.setQueryParmas });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        queryBuilder.updateQueryParams({
            id: "query",
            value: e.target.value,
        });
    };

    return (
        <PagenatedContainer service={service}>
            <p className="text-x bg-red p-l">{queryBuilder.get("query")}</p>
            <input defaultValue={queryBuilder.get("query")} type="text" onChange={onInputChange} />
            {/* <Button
                label="test page state"
                onClick={async () => {
                    service.setState("processing");
                    await new Promise((resolove) => setTimeout(resolove, 3000));
                    service.setState("idle");
                }}
            /> */}
            {/* <LoadButton service={service} /> */}
            <ReactStateBuilder
                //
                stateName="items"
                Component={() => service.items.map((item) => <ItemCard item={item} />)}
                service={service}
            />
            <ServiceStateBuilder service={service} />
            {/* <Grid service={service} itemBuilder={ItemCard} /> */}
        </PagenatedContainer>
    );
};

export default Items;

interface LoadButtonProps {
    service: IItemsService;
}

const LoadButton = ({ service }: LoadButtonProps) => {
    return (
        <div className="row-center gap-l">
            <p
                className="button"
                onClick={() => {
                    service.load();
                }}>
                loadItems
            </p>
            {/* <p
                className="button"
                onClick={() => {
                    service.setState("loading");
                }}>
                setLoading
            </p> */}
            <p
                className="button"
                onClick={() => {
                    service.reload();
                }}>
                reload
            </p>
            <p
                className="button"
                onClick={() => {
                    service.addNewItem({
                        barcode: "123",
                        name: "test",
                        code: "123",
                        id: 123,
                        unit: "123",
                        unitId: 123,
                    });
                }}>
                add item
            </p>
        </div>
    );
};

// React State Builder
// service.test,
// service.setTest,
// service.onTestChanged,

// const ReactStateBuilderD = ({ stateName: header, Component, service }) => {
//     [service.header, service.setHeader] = React.useState(service.header);
//     React.useEffect(() => {
//         service.onHeaderChanged?.();
//     }, [service[header]]);

//     return <>{Component}</>;
// };

const AmTestComponent = ({ items }) => {
    return (
        <>
            {items.map((t) => (
                <div key={t}>{t?.name}</div>
            ))}
        </>
    );
};

const load = async () => {
    const items = (await MorabaaClient.Items.load()) as any[];
    console.log(items[0].id);
};

const loadMore = async () => {
    const items = (await MorabaaClient.Items.loadMore()) as any[];
    console.log(items[0].id);
};

const reload = async () => {
    const items = (await MorabaaClient.Items.reload({ businessId: "" })) as any[];
    console.log(items[0].id);
};

const Header = () => {
    return (
        <div>
            <h1>Items</h1>
            <div className="row gap-3x p-3x bg-prim m-auto round-l">
                <div className="button" onClick={load}>
                    load
                </div>
                <div className="button" onClick={loadMore}>
                    loadMore
                </div>
                <div className="button" onClick={reload}>
                    reload
                </div>
            </div>
        </div>
    );
};
