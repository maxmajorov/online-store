import React from "react";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import classes from "./Swiper.module.scss";
// import "swiper/css";
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss";
import { RSType } from "../../mainPage/MainPage";

type SwiperPropsType = {
  images: Array<RSType>;
};

export const RCSwiper: React.FC<SwiperPropsType> = ({ images }) => {
  console.log(window.innerWidth);
  return (
    <div className={classes.swiper}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        speed={1000}
        effect={"coverflow"}
        spaceBetween={0}
        slidesPerView={
          1
          // window.innerWidth < 965
          //   ? 1
          //   : window.innerWidth > 965 && window.innerWidth < 1480
          //   ? 2
          //   : 3
          // window.innerWidth < 1480 ? 2 : window.innerWidth < 965 ? 1 : 3
        } //3
        loop
        grabCursor={true}
        pagination={{ clickable: true }}
        // scrollbar={{draggable: true}}
      >
        {images.map((item) => (
          <SwiperSlide key={item._id}>
            <img src={item.img} alt={item.title} />
            <span>{item.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
