import './HomePage.css';
import '../../App.css';

export default function HomePage() {
  return (
    <div className='homePage'>
      <div id='homeHeader'>
        <h1>Purdue MIND</h1>
        <h5>The frontier of Medicine, Innovation, Networking, and Design</h5>
      </div>

      <div className='break'/>

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
