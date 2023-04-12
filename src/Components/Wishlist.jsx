import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  return (
    <div>
      <h1>Wishlist Page</h1>
    </div>
  );
};

export default Wishlist;
