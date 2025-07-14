import Logo from "../../assets/logo";
import { Link } from "react-router-dom";
const Tasknotfound = ({ completed }) => {
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center flex-col">
        <div>
          <img
            src={Logo.notaskfound}
            className="h-[250px] max-md:h-[150px]"
            alt="notaskfound"
          />
        </div>
        <div>
          <div className="text-4xl max-md:text-3xl font-bold text-indigo-900">
            No Task
          </div>
        </div>
        <div className="text-zinc-400 text-2xl max-md:text-xl py-6 max-md:py-4">
          <div>There is no {completed} task</div>
        </div>
        <div className="my-6 max-md:my-4">
          <Link
            to="/addtask"
            className="bg-gradient-to-r from-[#2b7fff] to-[#155dfc] text-white font-medium py-3 max-md:py-2 px-4 max-md:3 rounded-lg shadow-md"
          >
            Create New Task
          </Link>
        </div>
      </div>
    </>
  );
};

export default Tasknotfound;
