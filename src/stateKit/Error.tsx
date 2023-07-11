import { JsonBuilder } from "morabaa-utils";
import JsonParser from "../../old/scripts/NodeBuilder";

const Error = ({ service, error = { Error: "not passed" } }) => {
    if (process.env.NODE_ENV === "production") return <></>;
    return (
        <div
            onClick={({ target }) => {
                console.log(service);
                if (service?.reload) {
                    service.reload();
                } else {
                    service?.setState("idle");
                }
            }}
            className="absolute bg-blur inset-0 justify-center col overflow-auto"
            style={{
                zIndex: 1000000,
            }}>
            <div className="col-center">
                <p className="text-white text-center animate-bounce rounded-full font-bold bg-red-500" style={{ padding: "40px 35px", opacity: 0.3 }}>
                    Error!
                </p>
                <JsonBuilder json={error} />
                {/* <DefaultItemBuilder item={error.stack ? { message: error.message, stack: error.stack } : error} /> */}
            </div>
        </div>
    );
};

export default Error;
