import './HomePage.css';
import '../../App.css';
import ToDisplay from '../../assets/home/Stryker-flyer.png'; // add your photo here (e.g. hero.jpg)

export default function HomePage() {
  return (
    <div className='homePage'>

      <h1>Purdue MIND</h1>

      <div id='imageContainer' style={{ display: 'flex', justifyContent: 'center'}}>
        <img
          src={ToDisplay}
          alt='Purdue MIND'
          style={{ width: '80%', maxWidth: 900, height: 'auto', border: 'solid 1px #777' }}
        />
      </div>

      <h2 id='eventsTxt'>Calendar</h2>

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

*/