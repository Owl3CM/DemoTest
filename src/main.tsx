import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToggleTheme from "./components/ToggleTheme";
import { setDefaultStateKit } from "morabaa-services";
import { StateKit } from "./stateKit";
import { ProviderContainer } from "morabaa-provider";
// import { setDefaultStateKit } from "morabaa-services";

setDefaultStateKit(StateKit);

createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <App />
        <ToggleTheme />
        <ProviderContainer />
    </BrowserRouter>
);

// setDefaultStateKit({
//   loading: ({ title = "" }) => {
//     return (
//       <div className="bg-red fixed inset-0 opacity-40 p-6x round-full">
//         <h1>loading </h1>
//         <span className="text-white">{title}</span>
//       </div>
//     );
//   },
//   demo: ({ title }: any) => (
//     <div className="bg-dragon p-4x round-full">
//       <h1>demo demo {title}</h1>
//     </div>
//   ),
// });
