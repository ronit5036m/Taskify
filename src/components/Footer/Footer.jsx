import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
const Footer = () => {
  return (
    // #141313
    <div className="max-md:h-[70vh] h-[40vh] w-full bg-[#e4e4e4c7] flex justify-center max-md:justify-evenly items-center flex-col pt-10">
      <div className="h-[70px] w-full text-3xl font-bold text-zinc-600 flex justify-center items-center">
        Taskify.com
      </div>
      <div className="h-[100px] w-[40%] max-md:w-full max-md:flex-wrap flex justify-evenly items-center font-medium text-zinc-600 flex-wrap">
        <Link to="/" className="max-md:p-5 hover:underline">
          HOME
        </Link>
        <Link to="/addtask" className="max-md:p-5 hover:underline">
          ADD TASK
        </Link>
        <Link to="/viewtask" className="max-md:p-5 hover:underline">
          VIEW TASK
        </Link>
        <Link to="/about" className="max-md:p-5 hover:underline">
          ABOUT US
        </Link>
      </div>
      <div className="text-[#2b7fff] h-14 w-[20%] max-md:w-full flex justify-center items-center gap-10">
        <div className="p-2.5 border-2 border-[#2b7fff] rounded-full hover:bg-[#2b7fff] hover:text-white transition-colors cursor-pointer">
          <Twitter />
        </div>
        <div className="p-2.5 border-2 border-[#2b7fff] rounded-full hover:bg-[#2b7fff] hover:text-white transition-colors cursor-pointer">
          <Instagram />
        </div>
        <div className="p-2.5 border-2 border-[#2b7fff] rounded-full hover:bg-[#2b7fff] hover:text-white transition-colors cursor-pointer">
          <Facebook />
        </div>
      </div>
      <div className="text-zinc-600 h-20 w-full flex justify-center items-center font-bold">
        <p>Copyright &copy;2025 All right reserved</p>
      </div>
      <div className="w-full text-[12px] text-zinc-600 flex justify-center gap-4">
        <Link className="hover:underline">Terms & Conditions</Link>
        <Link className="hover:underline">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Footer;
