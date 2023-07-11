import Loading from "./Loading";
import Progressing from "./Progressing";
// import ItemsLoading from "./ItemsLoading";
// import Error from "./Error";
// import Searching from "./Searching";
// import EmptyList from "./EmptyList";
// import NoContent from "./NoContent";

const StateKit = {
    processing: Progressing,
    // error: Error,
    // searching: Searching,
    // noData: EmptyList,
    // loadingMore: ItemsLoading,
    // noContent: NoContent,
    // reloading: Loading,
    loading: Loading,
    idle: null,
    reload: Loading,
};
export default StateKit;

export type IState = keyof typeof StateKit & string; // "idle" | "loading" | "processing" | "reloading" | "searching" | "error" | "noContent" | "loadingMore" | string;

export type ServiceState =
    | IState
    | { state: IState; props: any; parent?: HTMLElement | undefined }
    | {
          state: "noContent";
          props: {};
          parent?: HTMLElement | undefined;
      };
