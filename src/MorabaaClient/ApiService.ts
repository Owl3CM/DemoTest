import { MorabaaClientOptions } from "./MorabaaClient";

export const ClientRoots = {
    hub: "https://hubcore.morabaaapps.com/api",
    items: "https://items.morabaaapps.com/api",
    ownerTracker: "https://otracker.morabaaapps.com/api",
    sales: "https://salereports.morabaaapps.com/api",
    reps: "https://repsapi.morabaaapps.com/api",
    restaurant: "https://rest.morabaaapps.com/api",
    tickets: "https://tickets.morabaaapps.com/api",
    notifications: "https://notifications.morabaaapps.com/api",
    onlineDbBackup: "https://onlinedbbackup.morabaaapps.com/api",
    devConsole: "https://devconsole.morabaaapps.com/api",
    invoices: "https://saturn.morabaa.cloud/api",
};
export const getRoot = (root: keyof typeof ClientRoots) => ClientRoots[root];

const ApiService = {
    create: ({ headers, onResponse, onError, interceptor }: Props) => {
        const _apiService: IApiService = {
            get: createMethod("get"),
            delete: createMethod("delete"),
            post: createMethod("post"),
            put: createMethod("put"),
            patch: createMethod("patch"),
            update: createMethod("update"),
        };
        function createMethod(method: string) {
            return ({ url, body, headers: _headers = headers }: IMethod) => {
                const abortId = `${method}-${url.split("?")[0]}`;
                if (_apiService[abortId]) {
                    console.warn("A B O R T E D \n" + abortId + "\n?" + url.split("?")[1]);
                    _apiService[abortId].abort();
                }
                _apiService[abortId] = new AbortController();
                let props = {
                    method: method.toUpperCase(),
                    headers: _headers,
                    "Content-Type": "application/json",
                    body: body ? JSON.stringify(body) : null,
                    signal: _apiService[abortId].signal,
                };
                return new Promise(async (resolve, reject) => {
                    try {
                        props.headers.Authorization = MorabaaClientOptions.authToken;
                        if (interceptor) props = await interceptor(props);
                        const res = await fetch(url, props);
                        _apiService[abortId] = null;
                        if (res.ok) {
                            let jsonRes = {};
                            try {
                                jsonRes = await res?.json();
                            } catch (er) {}
                            onResponse?.(jsonRes);
                            resolve(jsonRes);
                        } else {
                            const message = JSON.parse(await res.text());
                            reject(getErrorRespoinse({ ...res, message }, props));
                        }
                    } catch (err: any) {
                        if (err.name === "AbortError") return;
                        if (onError) onError(err);
                        else reject(err);
                    }
                });
            };
        }
        return _apiService;
    },
};

interface Props {
    headers?: any;
    onResponse?: Function;
    onError?: Function;
    interceptor?: Function;
}

interface IMethod {
    // baseURL: string;
    // endpoint: string;
    url: string;
    body?: any;
    headers?: any;
}

interface IApiService {
    get: (props: IMethod) => Promise<any>;
    delete: (props: IMethod) => Promise<any>;
    post: (props: IMethod) => Promise<any>;
    put: (props: IMethod) => Promise<any>;
    patch: (props: IMethod) => Promise<any>;
    update: (props: IMethod) => Promise<any>;
}

const getErrorRespoinse = (res: any, props: any) => ({ ...props, ...res, statusMessage: StatusCodeByMessage[res.status] || "Unknown Error" });

const StatusCodeByMessage = {
    0: "There Is No Response From Server Body Is Empty Connection May Be Very Slow",

    100: " Continue ",
    101: " Switching protocols ",
    102: " Processing ",
    103: " Early Hints ",

    //2xx Succesful
    200: " OK ",
    201: " Created ",
    202: " Accepted ",
    203: " Non-Authoritative Information ",
    204: " No Content ",
    205: " Reset Content ",
    206: " Partial Content ",
    207: " Multi-Status ",
    208: " Already Reported ",
    226: " IM Used ",

    //3xx Redirection
    300: " Multiple Choices ",
    301: " Moved Permanently ",
    302: " Found (Previously 'Moved Temporarily') ",
    303: " See Other ",
    304: " Not Modified ",
    305: " Use Proxy ",
    306: " Switch Proxy ",
    307: " Temporary Redirect ",
    308: " Permanent Redirect ",

    //4xx Client Error
    400: " Bad Request ",
    401: " Unauthorized ",
    402: " Payment Required ",
    403: " Forbidden ",
    404: " Not Found ",
    405: " Method Not Allowed ",
    406: " Not Acceptable ",
    407: " Proxy Authentication Required ",
    408: " Request Timeout ",
    409: " Conflict ",
    410: " Gone ",
    411: " Length Required ",
    412: " Precondition Failed ",
    413: " Payload Too Large ",
    414: " URI Too Long ",
    415: " Unsupported Media Type ",
    416: " Range Not Satisfiable ",
    417: " Expectation Failed ",
    418: " I'm a Teapot ",
    421: " Misdirected Request ",
    422: " Unprocessable Entity ",
    423: " Locked ",
    424: " Failed Dependency ",
    425: " Too Early ",
    426: " Upgrade Required ",
    428: " Precondition Required ",
    429: " Too Many Requests ",
    431: " Request Header Fields Too Large ",
    451: " Unavailable For Legal Reasons ",

    //5xx Server Error
    500: " Internal Server Error ",
    501: " Not Implemented ",
    502: " Bad Gateway ",
    503: " Service Unavailable ",
    504: " Gateway Timeout ",
    505: " HTTP Version Not Supported ",
    506: " Variant Also Negotiates ",
    507: " Insufficient Storage ",
    508: " Loop Detected ",
    510: " Not Extended ",
    511: " Network Authentication Required ",
};

export default ApiService;
