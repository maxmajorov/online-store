import React from "react";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import classes from "./Swiper.module.scss";
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss";
import { RSType } from "../../mainPage/MainPage";

type SwiperPropsType = {
  images: Array<RSType>;
};

export const RCSwiper: React.FC<SwiperPropsType> = ({ images }) => {
  return (
    <div className={classes.swiper}>
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        navigation={{ hiddenClass: "swiper-button-hidden" }}
        autoplay={true}
        speed={1000}
        effect={"coverflow"}
        spaceBetween={0}
        slidesPerView={1}
        loop
        grabCursor={true}
        pagination={{ clickable: true }}
        // scrollbar={{draggable: true}}
      >
        {images.map((item) => (
          <SwiperSlide key={item._id}>
            <img src={item.img} alt={item.title} />
            <span className={classes.title}>{item.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
