import Typed from "react-typed";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="uppercase font-bold p-2">Welcome to the store!</p>
        <h1 className="md:text-7xl sm:text-6xl text-3xl font-bold md:py-6">
          Buy with ARCHI-TECH
        </h1>
        <div>
          <p className="md:text-5xl sm:4xl text-xl font-bold pt-2">
            Affordable Prices for{" "}
            <span className="text-[#E4FDE1] underline decoration-solid underline decoration-[#DE3C4B]">
              <Typed
                strings={["TV's", "Consoles.", "Cameras."]}
                typedSpeed={180}
                backSpeed={180}
                loop
                className="md:text-5xl sm:4xl text-xl font-bold "
              />
            </span>
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold pt-12">
          An all-out store for all your technological needs!
        </p>
        <Link to="/products">
          <button className="mt-8 mx-auto py-4 px-10 rounded-lg border font-bold md:text-2xl sm:text-xl text-md text-[#E4FDE1] border-[#DE3C4B]">
            VIEW ALL PRODUCTS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
