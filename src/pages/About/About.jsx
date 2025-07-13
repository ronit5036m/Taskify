import Navbar from "../../components/Navigation/Navbar";
import Footer from "../../components/Footer/Footer";
const About = () => {
  return (
    <>
      <Navbar />
      <div className="h-[70vh] flex justify-center max-md:h-[75vh]">
        <div className=" h-[90%] w-[80%] max-md:w-[95%] flex justify-center flex-col gap-5">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              About{" "}
              <span className="before:bg-blue-500 before:text-white">
                Taskify
              </span>
            </div>
          </div>
          <div className="h-[30%] flex max-md:justify-evenly items-start w-full justify-end text-lg font-medium text-zinc-600 flex-col gap-5">
            <p>
              At Taskify, we believe that managing your tasks should be simple,
              efficient, and stress-free. Whether you're a student,
              professional, or entrepreneur, our platform helps you organize
              your work and stay focused on what truly matters.
            </p>
            <p>
              We created Taskify with the goal of providing a lightweight yet
              powerful task management solution for individuals and teams.
            </p>
          </div>
        </div>
      </div>

      {/* Our mission */}

      <div className="h-[70vh] flex justify-center max-md:h-[75vh]">
        <div className=" h-[90%] w-[80%] max-md:w-[95%] flex justify-evenly flex-col gap-5">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              Our{" "}
              <span className="before:bg-blue-500 before:text-white">
                Mission
              </span>
            </div>
          </div>
          <div className="h-[40%] flex max-md:justify-evenly items-start w-full text-lg font-medium text-zinc-600 flex-col gap-5">
            <div className="pl-5">
              <ul className="h-full flex flex-col list-disc justify-evenly">
                <li>To make task management accessible to everyone.</li>
                <li>
                  To provide a clean and intuitive interface for creating,
                  updating, and tracking tasks.
                </li>
                <li>
                  To empower users to be more productive and organized in their
                  daily lives.
                </li>
                <li>
                  To create a platform that supports collaboration and growth
                  for teams.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Taskify? */}

      <div className="h-[70vh] flex justify-center max-md:h-[75vh]">
        <div className=" h-[90%] w-[80%] max-md:w-[95%] flex justify-evenly flex-col gap-5">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              Why{" "}
              <span className="before:bg-blue-500 before:text-white">
                Choose Taskify ?
              </span>
            </div>
          </div>
          <div className="h-[40%] flex max-md:justify-evenly items-start w-full text-lg font-medium text-zinc-600 flex-col gap-5">
            <div className="pl-5">
              <ul className="h-full flex flex-col list-disc justify-evenly">
                <li>
                  Easy to Use: Minimalist design with all essential features.
                </li>
                <li>
                  Fast & Secure: Built with the latest technologies and strong
                  security practices.
                </li>
                <li>
                  Anywhere Access: Use it from your phone, tablet, or desktop
                  anytime.
                </li>
                <li>
                  Built for You: Whether you're managing personal tasks or team
                  projects, Taskify adapts to your needs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different? */}

      <div className="h-[70vh] flex justify-center max-md:h-[75vh]">
        <div className=" h-[90%] w-[80%] max-md:w-[95%] flex justify-evenly flex-col gap-5">
          <div className="h-[80px] w-full text-6xl flex items-center font-bold text-zinc-600 max-md:text-4xl">
            <div>
              What{" "}
              <span className="before:bg-blue-500 before:text-white">
                Makes Us Different ?
              </span>
            </div>
          </div>
          <div className="h-[40%] flex max-md:justify-evenly items-start w-full text-lg font-medium text-zinc-600 flex-col gap-5">
            <div className="pl-5">
              <ul className="h-full flex flex-col list-disc justify-evenly">
                <li>
                  Unlike cluttered task apps, Taskify focuses on simplicity and
                  clarity.
                </li>
                <li>
                  We value your privacy - your data stays secure and in your
                  control.
                </li>
                <li>
                  We're constantly improving the platform based on user
                  feedback.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
