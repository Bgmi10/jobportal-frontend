import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export const Slider_company_img = () => {


    const imgs = [
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af3410163e264c_google_-%20logo-300x82.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af3468003e2696_microsoft_-%20logo-300x65.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af34b7653e2519_amazon_-%20logo-300x119.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af34e2223e2540_cisco_-%20logo-300x119.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af3426f83e2678_nike_-%20logo-300x303.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af3471533e2698_mcdonald%27s_-%20logo-300x39.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af347e343e268c_toyota_-%20logo-300x115.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af34637b3e25fd_disney_-%20logo-300x82.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af3443153e2685_samsung_-%20logo-300x115.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af34b6383e2562_coca_cola%20-%20logo-300x119.png',
        'https://cdn.prod.website-files.com/6312535109af3402143e250c/6312535109af34bb073e26b4_facebook-300x60.png'
    ]
    const settings = {
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0, // Continuous scroll
      speed: 3000, // Speed of transition
      cssEase: "linear", 
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 0, // Continuous scroll
            speed: 3000, // Speed of transition
            cssEase: "linear",      
          },
        },
      ],  
     };
  return (
    <div className='mt-10  '> 
            
              <Slider {...settings} >
              {imgs.map((i , index) => (
                <img src={i} className='h-20 m-4 p-5 ' key={index} />
              ))}
              </Slider>
            
    </div> 
  )
}
