const ClientStorage = {
    storageKey: "morabaa-",
    storage: sessionStorage,
    // storage: getMemoryStorage(),
    // storage: localStorage,
    get: (store_key: string) => JSON.parse(ClientStorage.storage.getItem(getCleanString(store_key))),

    remove: (store_key: string) => ClientStorage.storage.removeItem(getCleanString(store_key)),

    set: (store_key: string, data: any) =>
        Object.values(data).length > 0 ? ClientStorage.storage.setItem(getCleanString(store_key), JSON.stringify(data)) : ClientStorage.remove(store_key),

    insert(key: string, value: Array<any> | Object) {
        const _stored = this.get(key);
        let toStore = value;
        if (_stored?.length) {
            if (Array.isArray(toStore)) toStore = [..._stored, ...toStore];
            else if (typeof toStore === "object") toStore = { ..._stored, ...toStore };
        }
        this.set(key, toStore);
    },
    clear: () => {
        for (let i = 0; i < ClientStorage.storage?.length; i++) {
            let key = ClientStorage.storage.key(i);
            if (key.startsWith(ClientStorage.storageKey)) ClientStorage.storage.removeItem(key);
        }
    },
};

export default ClientStorage;
const getCleanString = (text = "") => ClientStorage.storageKey + text.replace(/[?&=/!]/g, "-");

function getMemoryStorage() {
    const memoryStorage = {
        getItem: (key: string) => memoryStorage[key] ?? null,
        setItem: (key: string, value: any) => {
            memoryStorage[key] = value;
            memoryStorage.length++;
        },
        removeItem: (key: string) => {
            delete memoryStorage[key];
            memoryStorage.length--;
        },
        key: (index: number) => Object.keys(memoryStorage)[index] ?? null,
        length: 0,
    };
    return memoryStorage;
}

// this.getStored = (store_key: string) => JSON.parse(this.storage.getItem(getCleanString(store_key)));
// this.removeStorage = (store_key: string) => this.storage.removeItem(getCleanString(store_key));
// this.store = (store_key: string, data: any) =>
//     Object.values(data).length > 0 ? this.storage.setItem(getCleanString(store_key), JSON.stringify(data)) : this.removeStorage(store_key);
// this.clearStorage = () => {
//     for (let i = 0; i < this.storage?.length; i++) {
//         let key = this.storage.key(i);
//         if (key.startsWith(this.storageKey)) this.storage.removeItem(key);
//     }
//     this.setData({});
// };
// getCleanString = (text = "") => this.storageKey + text.replace(/[?&=/!]/g, "-");
