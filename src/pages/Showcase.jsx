import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";

export default function Shwocase() {
  return (
    <>
      {/*Navbar at top */}
      <div className="navbar sticky inset-x-0 top-0 z-50 h-16 w-screen bg-white border-b">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#the-project" className="font-display-lemonlight">
                  The Project
                </a>
              </li>
              <li>
                <a href="#the-team" className="font-display-lemonlight">
                  The Team
                </a>
              </li>
            </ul>
          </div>
          <a
            href="#home"
            className="btn text-shadow-none text-xl p-0 h-15 bg-white w-auto border-0"
          >
            <img
              src="/media/UNMC_emblem.png"
              alt="UNMC"
              className="h-15 w-auto"
            />
            <p className="font-display-lemonlight text-2xl mr-0.5">UNMC</p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                href="#the-project"
                className="text-2xl font-display-lemonlight"
              >
                The Project
              </a>
            </li>
            <li>
              <a> </a>
            </li>
            <li>
              <a href="#the-team" className="text-2xl font-display-lemonlight">
                The Team
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn text-shadow-none font-display-lemonlight text-2xl p-0 h-15 w-25 border-0 bg-white"
          >
            Login
          </Link>
        </div>
      </div>

      {/* The Home Page */}
      <Reveal className="reveal">
        <section
          id="home"
          className="grid relative place-items-center min-h-[calc(100vh-4rem)] overflow-hidden -mb-px scroll-mt-16"
        >
          <img
            src="/media/robot_landscape.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          ></img>
          <div className="pointer-events-none absolute inset-0 bg-black/50"></div>
          <Reveal className="delay-1">
            <h1 className="text-[24vmin] tracking-widest font-display-lemon text-outline z-10 leading-none text-center text-white">
              {["H", "O", "L", "L", "A", "N", "D"].map((ch, i) => (
                <span key={i} className={`fly delay-${i}`}>
                  {ch}
                </span>
              ))}
            </h1>
          </Reveal>
        </section>
      </Reveal>

      {/* The Project Page */}
      <section
        id="the-project"
        className="mx-auto max-w-6xl px-4 py-8 space-y-6 scroll-mt-16"
      >
        {/* Header */}
        <Reveal className="reveal">
          <div className="rounded-xl p-4 place-items-center">
            <h1 className="text-5xl font-display-lemon text-black">
              The Project
            </h1>
          </div>
        </Reveal>
        {/* Intro Holland */}
        <div className="grid gap-24 md:grid-cols-2 my-3 mx-7">
          <Reveal className="reveal delay-2">
            <div className="rounded-xl p-4 scale-y-85">
              <video
                src="/media/robot_vid_720p.mp4"
                autoPlay
                playsInline
                loop
                muted
              ></video>
            </div>
          </Reveal>

          <div className="rounded-xl p-4 flex items-center justify-center text-2xl font-mono text-wrap">
            <Reveal className="reveal-x">
              <p>
                The Holland System is an integration of a modern healthcare
                facility and a human-like nursing assistant robot.
              </p>
            </Reveal>
          </div>
        </div>
        {/* More Info */}
        <div className="grid gap-24 md:grid-cols-2 my-3 mx-7">
          <div className="rounded-xl p-4 flex items-center justify-center text-2xl font-mono text-wrap">
            <Reveal className="reveal-x">
              <p>
                Users-including clinicians, patients, and visitors can interact
                with the system using natural language on this website or
                through communication devices.
              </p>
            </Reveal>
          </div>
          <Reveal className="reveal delay-2">
            <div className="rounded-xl p-4">
              <img src="/media/robot1.jpg"></img>
            </div>
          </Reveal>
        </div>
        {/* More Info */}
        <div className="grid gap-24 md:grid-cols-2 my-3 mx-7">
          <Reveal className="reveal delay-2">
            <div className="rounded-xl p-4 scale-90">
              <img src="/media/robot2.jpg"></img>
            </div>
          </Reveal>
          <div className="rounded-xl p-4 flex items-center justify-center text-2xl font-mono text-wrap">
            <Reveal className="reveal-x">
              <p>
                The Al for the system combines intelligent facility monitoring
                and control, with the robot serving as the endpoint for
                interaction.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Team Page */}
      <section
        id="the-team"
        className="mx-auto max-w-6xl mt-32 px-4 py-8 space-y-6 scroll-mt-16"
      >
        {/* Header */}
        <Reveal className="reveal delay-2">
          <div className="rounded-xl p-4 place-items-center">
            <h1 className="text-5xl font-display-lemon">The Team</h1>
          </div>
        </Reveal>
        {/* Team List 1 */}
        <Reveal className="reveal delay-2">
          <div className="grid gap-x-24 gap-y-6 md:grid-cols-4 md:grid-rows-2 mt-12 mx-7">
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
          </div>
        </Reveal>
        {/* Team List 2 */}
        <Reveal className="reveal delay-2">
          <div className="grid gap-x-24 gap-y-6 md:grid-cols-4 md:grid-rows-2 mt-12 mx-7">
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <img src="/media/placeholder.jpg" className="border-b-2"></img>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
            <p className="font-mono text-center">info...</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
