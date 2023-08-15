import './HomePage.css';
import '../../App.css';

import Feed from "instagram-feed-embed";

import Carousel from 'react-img-carousel';
require('react-img-carousel/lib/carousel.css');

export default function HomePage() {
  return (
    <div className='homePage'>
      <div id='homeHeader'>
        <h1>Purdue MIND</h1>
        <h5>The frontier of Medicine, Innovation, Networking, and Design</h5>
      </div>

      <div id='slideshowContainer'>
        <Carousel id='slideshow' autoplay='true' autoplaySpeed='3500' viewport='300px' slideHeight='300px' cellPadding={ 5 }>
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1RFUmbm5AIpjAE182eDTbtMdAjAXfefYL'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=132vTHosT7TuoguIWLzpPHiwfBpzFDr2o'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1MLlg_3jrivuNVChxpNas3Yd6DUiGUl2_'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1YxgH9U8WV9GBey7fKE_jEyuW0epgnRf4'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1uNQNz7DFm8huEKJaRHlYdala3m6zI2qm'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1Rwwp8Qe7eyjJe4_PB9HqhWfdtHSrsnKR'
            />
            <img
              className='carouselPic'
              alt=''
              src='https://drive.google.com/uc?export=view&id=1d7wy_vaPE28MHYf5Zw4kQ4qkJJ5SJJxv'
            />
        </Carousel>
      </div>

      <div className='break'/>
      

      <h2 id='eventsTxt'>Upcoming Events</h2>
      <iframe 
          id='calendar' title='MIND Calendar'
          src='https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ceb888&amp;ctz=America%2FIndiana%2FIndianapolis&amp;src=ZGZjcGRlb245dmcwczAzYzk0dWRvYzVxbWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=1&amp;showTitle=0'
          style={{border: 'solid 1px #777'}}
          width={window.innerWidth * .8}
          height='600'
          frameborder='0' scrolling='no'
      />
    </div>
  );
};
