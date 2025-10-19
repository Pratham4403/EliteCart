import React, { useState, useEffect } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";
import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const nextImage = () => {
    setCurrentImage((prev) => (prev === desktopImages.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? desktopImages.length - 1 : prev - 1));
  };

  useEffect(() => {
  const interval = setInterval(() => {
    nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-12 rounded">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative overflow-hidden rounded-lg">
        <div className="absolute z-10 h-full w-full md:flex items-center justify-between hidden">
          <button className="bg-white rounded-full shadow-md p-1 ml-2 h-10 w-10 flex justify-center items-center" onClick={previousImage}>
            <ChevronLeftIcon style={{ fontSize: "34px" }} />
          </button>
          <button className="bg-white rounded-full shadow-md p-1 mr-2 h-10 w-10 flex justify-center items-center" onClick={nextImage}>
            <ChevronRightIcon style={{ fontSize: "34px" }} />
          </button>
        </div>

        <div className="hidden md:flex h-full w-full transition-transform duration-700 ease-in-out">
          {
            desktopImages.map((imageURL, index) => (
              <div key={imageURL} className="w-full h-full min-w-full min-h-full" style={{transform: `translateX(-${currentImage * 100}%)`}}>
                <img src={imageURL} className="w-full h-full object-cover" alt="Banner" />
              </div>
            ))
          }
        </div>

        <div className="flex md:hidden h-full w-full transition-transform duration-700 ease-in-out">
            {
              mobileImages.map((imageURL) => (
                <div key={imageURL} className="w-full h-full min-w-full min-h-full" style={{transform: `translateX(-${currentImage * 100}%)`}}>
                  <img src={imageURL} className="w-full h-full object-cover" alt="Banner" />
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;