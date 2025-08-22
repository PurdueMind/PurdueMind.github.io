import './HomePage.css';
import '../../App.css';
import ToDisplay from '../../assets/home/B-involved Fair Flyer.png'; // add your photo here (e.g. hero.jpg)

export default function HomePage() {
  return (
    <div className='homePage'>

      {/* Local hero image (put your image at src/assets/home/hero.jpg or change the import above) */}
      <div id='heroImageContainer' style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <img
          src={ToDisplay}
          alt='Purdue MIND'
          style={{ width: '80%', maxWidth: 900, height: 'auto', border: 'solid 1px #777' }}
        />
      </div>

      <h2 id='eventsTxt'>Upcoming Events</h2>
      <iframe 
          id='calendar' title='MIND Calendar'
          src='https://calendar.google.com/calendar/embed?src=purdueuniversitymind%40gmail.com&ctz=America%2FNew_York'
          style={{border: 'solid 1px #777'}}
          width={window.innerWidth * .8}
          height='600'
          frameborder='0'
      />
    </div>
  );
};

/*
<div id='homeHeader'>
        <h1>Purdue MIND</h1>
        <p>The frontier of Medicine, Innovation, Networking, and Design</p>
      </div>
*/