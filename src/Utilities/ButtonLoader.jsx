import { Oval } from "react-loader-spinner";


const ButtonLoader = () => {
    return (
            <div
                className="w-full bg-red-100 text-white py-2 rounded-lg cursor-not-allowed transition duration-200 flex items-center justify-center">
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  strokeWidth={5}
                />
            </div>
    );
};

export default ButtonLoader;