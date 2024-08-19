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
          src='https://calendar.google.com/calendar/embed?src=b0e53c317ea85aff2759274334d29569efe70106b5ec68999a5ad69efa8980a5%40group.calendar.google.com&ctz=America%2FNew_York'
          style={{border: 'solid 1px #777'}}
          width={window.innerWidth * .8}
          height='600'
          frameborder='0'
      />
    </div>
  );
};
