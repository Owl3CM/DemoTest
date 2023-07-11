import Loader from "./Loader";

interface Props {
    label: ILang;
    service: any;
}

const Progressing = ({ label = "processing" }: Props) => {
    return (
        <div className="fixed inset-0 col processing-container">
            <div className="col-center m-auto">
                <Loader />
                <p className="text-center">{label}</p>
            </div>
        </div>
    );
};

export default Progressing;
