import "./LoadingLogo.css";
const LoadingLogo = () => {
  return (
    <>
      <div>
        <div className="h-[100vh] flex justify-center items-center flex-col">
          <div className="text-4xl font-bold text-blue-500 loading">
            Taskify
          </div>
          <div className="h-[8px] w-[200px] rounded-[50px] mt-[20px] relative bg-white progress"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingLogo;
