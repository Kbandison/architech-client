import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex w-screen">
      <img src={product.image} alt={product.name} className="w-96 h-56" />
      <h2>{product.name}</h2>
      <div>
        <button className="button">Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
