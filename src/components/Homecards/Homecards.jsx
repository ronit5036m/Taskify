const Homecards = ({ image, title, description }) => {
  return (
    <>
      <div className="h-[300px] max-md:h-[350px] max-md:w-[350px] w-[300px] shadow-[0px_0px_25px_#ccc] rounded-2xl hover:scale-101 transition-transform mt-2 overflow-hidden bg-white cursor-pointer">
        <div className="h-full w-full">
          <img src={image} className="h-[60%] w-full" alt={title} />
          <div className="h-[40%] w-full p-2">
            <div className="font-semibold text-zinc-500 text-xl">{title}</div>
            <div className="font-light text-zinc-500">{description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homecards;
