import { GiComputerFan } from "react-icons/gi";

const Spinner = () => {
  return (
    <div className="flex justify-center m-96 p-4">
      <GiComputerFan className="animate-spin text-8xl" />
    </div>
  );
};

export default Spinner;
