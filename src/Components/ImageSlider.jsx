const ImageSlider = ({ image }) => {
  return (
    <div className="w-[30vw] h-[20vw] border border-blue-500">
      <img src={image.href} alt="" className="w-full h-full" />
    </div>
  );
};

export default ImageSlider;
