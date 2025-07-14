import "./Loading.css";
const Loading = () => {
  return (
    <>
      <div className="h-[100vh] fixed w-full bg-white overflow-scroll-[none]">
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-[50px] w-[50px] border-[5px] rounded-full border-t-white border-blue-400 spin"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
