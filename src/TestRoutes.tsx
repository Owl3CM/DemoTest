import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Demo from "./pages/Demo";
import Items from "./pages/items/Items";

const _DemoRoutes = [
    //
    { path: "/", Component: Demo, title: "home" },
    { path: "/items", Component: Items, title: "items" },
];
const TestRoutes = () => {
    return (
        <>
            <Routes>
                {_DemoRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>

            <div className="fixed bottom-0 left-0 right-0 row-center overflow-auto justify-center gap-x bg-prim p-s">
                {_DemoRoutes.map(({ path, title }) => (
                    <Link
                        className="button"
                        key={path}
                        to={path}
                        style={{
                            backgroundColor: window.location.pathname === path ? "var(--purple)" : "var(--king",
                        }}
                        onClick={({ currentTarget }) => {
                            currentTarget.parentElement?.querySelectorAll("a").forEach((a) => {
                                a.style.backgroundColor = a === currentTarget ? "var(--purple)" : "var(--king)";
                            });
                        }}>
                        {title}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default TestRoutes;
