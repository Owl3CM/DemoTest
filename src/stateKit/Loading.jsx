import Loader from "./Loader";

const Loading = ({ service }) => {
    return (
        <div className="fixed inset-0 col loading-container">
            <div className="col-center m-auto">
                <Loader />
            </div>
        </div>
    );
};

export default Loading;
