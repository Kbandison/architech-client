import { Link, useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate();
  if (!props.cartOpen) {
    return null;
  } else {
    return (
      <div className="fixed bg-black w-full h-screen flex justify-center items-center bg-opacity-70 backdrop-blur-sm inset-0">
        <div className="border h-1/3 rounded-lg flex bg-black">
          <img
            src="https://www.nicepng.com/png/detail/134-1343846_free-icons-png-shopping-cart-icon-transparent.png"
            alt=""
            className="w-96 rounded-md"
          />
          <div className="">
            <p
              className="cursor-pointer text-end font-bold p-4"
              onClick={props.onClose}
            >
              X
            </p>
            <div className="p-16">
              <h2 className="text-center">
                {props.wishOpen
                  ? "Item added to Wishlist"
                  : props.removeWish
                  ? "Item removed from Wishlist"
                  : "Item added to Cart!"}
              </h2>
              <div className="flex justify-center gap-20 mt-16">
                <button className="button" onClick={props.onClose}>
                  Continue Shopping
                </button>
                <Link to={props.wishOpen ? "/wishlist" : "/cart"}>
                  <button className="button">
                    {props.wishOpen ? "Go to Wishlist" : "Go to Cart"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
