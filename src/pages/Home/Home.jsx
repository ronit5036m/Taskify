import Navbar from "../../components/Navigation/Navbar";
import { CircleArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ourGoals, features } from "../../components/Objects/Objects";
import Homecards from "../../components/Homecards/Homecards";
import Footer from "../../components/Footer/Footer";
import "../../pages/Home/Home.css";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="h-[100vh] flex justify-center items-center flex-col max-md:gap-10">
        <div className="text-5xl font-extrabold uppercase text-zinc-600 h-[10%] flex justify-center items-center max-md:text-4xl text-center">
          <q>Simplify your tasks. Amplify your life.</q>
        </div>
        <div className="h-[35%] w-full flex justify-center items-center">
          <div className="w-[50%] h-full text-lg font-medium text-zinc-600 flex justify-center items-center max-md:w-full">
            <p className="text-center">
              Taskify is a modern, lightweight and user-friendly task management
              platform designed to help individuals and teams stay organized.
              With Taskify, you can easily register, create tasks, update them,
              and track your daily goals. Taskify simplifies your workflow,
              whether you're managing personal to-dos or collaborating on
              projects.
            </p>
          </div>
        </div>
        <div className="h-[10%] w-full flex justify-center items-center">
          <button
            className="h-[50px] hover:scale-115 transition-[0.5s] w-[250px] rounded-4xl bg-blue-500 text-white flex items-center justify-evenly cursor-pointer font-bold text-lg hover:bg-blue-600"
            onClick={() => {
              navigate("/addtask");
            }}
          >
            Get started <CircleArrowRight />
          </button>
        </div>
      </div>

      {/* Our goal */}

      <div className="h-[90vh] max-md:h-[230vh] flex justify-center">
        <div className="h-full w-[80%] max-md:w-[95%] flex justify-evenly flex-col">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              Our{" "}
              <span className="before:bg-blue-500 before:text-white">Goal</span>
            </div>
          </div>
          <div className="h-[100px] flex justify-start items-center w-full text-lg font-medium text-zinc-600">
            <p>
              Provide an intuitive platform for planning and tracking daily
              goals. and Empower individuals and teams to achieve more in less
              time.
            </p>
          </div>
          <div className="h-[80%]">
            {ourGoals.length === 0 ? (
              <div>not data Found !!</div>
            ) : (
              <div className="h-full w-full flex max-md:flex-col flex-wrap justify-evenly overflow-x-hidden items-center gap-10 overflow-y-scroll max-md:overflow-y-hidden max-md:mt-5">
                {ourGoals.map((data) => (
                  <Homecards
                    image={data.image}
                    title={data.title}
                    description={data.description}
                    key={data.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Taskify Features */}

      <div className="h-[90vh] max-md:h-[230vh] flex justify-center">
        <div className="h-full w-[80%] max-md:w-[95%] flex justify-evenly flex-col">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              Taskify{" "}
              <span className="before:bg-blue-500 before:text-white">
                Features
              </span>
            </div>
          </div>
          <div className="h-[100px] flex justify-start items-center w-full text-lg font-medium text-zinc-600">
            <p>Simple and clean interface for quick task management.</p>
          </div>
          <div className="h-[80%]">
            {ourGoals.length === 0 ? (
              <div>not data Found !!</div>
            ) : (
              <div className="h-full w-full flex max-md:flex-col flex-wrap justify-evenly overflow-x-hidden items-center gap-10 overflow-y-scroll max-md:overflow-y-hidden max-md:mt-5">
                {features.map((data) => (
                  <Homecards
                    id={data.id}
                    image={data.image}
                    title={data.title}
                    description={data.description}
                    key={data.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
