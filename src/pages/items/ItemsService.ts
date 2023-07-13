import { Popup, PopupMe } from "morabaa-provider";
import { MorabaaClient } from "../../MorabaaClient";
import ClientService from "../../MorabaaClient/ClientService";
import { IItem } from "../../MorabaaClient/items";
import { AmPopup } from "../Demo";

export type IItemsService = ItemsService;

export default class ItemsService extends ClientService<any, any> {
    constructor() {
        super({
            client: MorabaaClient.Items,
            onResponse: async (data: any, service: ItemsService, clear: boolean) => {
                // await new Promise((resolve) => setTimeout(resolve, 3000));
                service.setItems((prev: any[]) => (clear ? data : [...prev, ...data]));
                setTimeout(() => {
                    service.canFetch = !!(service.limit && data.length >= service.limit);
                }, 100);
                service.setState("idle");

                // service.setState(Object.keys(service.data).length > 0 || data.length > 0 ? "idle" : "noContent");
            },
        });
        // this.load();
    }

    popupAddItem = () => {
        PopupMe({
            id: "am-popup-2",
            Component: AmPopup,
            componentProps: {
                label: "AM POPUP 2",
                onClick: () => {
                    this.setState("processing");
                    setTimeout(() => {
                        this.setState("idle");
                    }, 1000);
                    Popup.remove("am-popup-2");
                },
            },
        });
    };
    // loadItems = async (clear?: boolean) => {
    //     const items = await MorabaaClient.Items.load();
    //     this.setItems(items);
    // };

    addNewItem = async (item: IItem) => {
        const items = await MorabaaClient.Items.add(item);
        this.setItems(items);
    };

    items: any = [];
    setItems = (prev: any | ((prev: any) => any)) => {
        if (typeof prev === "function") prev = prev(this.data);
        this.data = prev;
    };


    // onItemsChanged = (newItems: any) => {
    //     console.log({ test: newItems }, "from change");
    // };

    // items: any = [];
    // setItems = (prev: any | ((prev: any) => any)) => {
    //     if (typeof prev === "function") prev = prev(this.data);
    //     this.data = prev;
    // };
}
