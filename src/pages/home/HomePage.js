import './HomePage.css';
import '../../App.css';
//import ToDisplay from '../../assets/home/Stryker-flyer.png';

export default function HomePage() {
  return (
    <div className='homePage'>

      <h1>Purdue MIND</h1>

      <p>Purdue MIND is a multidisciplinary student organization that promotes and grows the biomedical engineering community by providing undergraduates with hands-on experience in medical technology innovation—from research and design to commercialization—while fostering collaboration, professional networking, and participation in national design competitions.</p>

      <h2><a href="https://join.slack.com/t/purdue-mind-workspace/shared_invite/zt-3cy3ljpxd-RqL5fJwChYdRKniiasXepw" target="_blank" rel="noopener noreferrer">Join our Slack!</a></h2>

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
<div id='imageContainer' style={{ display: 'flex', justifyContent: 'center'}}>
        <img
          src={ToDisplay}
          alt='Purdue MIND'
          style={{ width: '80%', maxWidth: 900, height: 'auto', border: 'solid 1px #777' }}
        />
      </div>
*/