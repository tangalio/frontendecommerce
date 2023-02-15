// import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import Card_product from "./Card_product";
import { Container } from "react-bootstrap";

function NewProduct(props) {

  const hasMany = props.hasMany;
  return (
    <Container>
      <div className='new-product'>
        <div className='new-product-title'>
          <h1>SẢN PHẨM MỚI</h1>
        </div>
        <div className='new-product-content'>
          <Swiper
            slidesPerView={5}
            spaceBetween={15}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >

            {
              hasMany.map((item) => {
                return (
                  <SwiperSlide><Card_product img={`http://localhost:8000/${item.image}`} category_id={item.category_id} description={item.description} id={item.id} name={item.name} price={item.price} /></SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>

    </Container>
  );
}

export default NewProduct;