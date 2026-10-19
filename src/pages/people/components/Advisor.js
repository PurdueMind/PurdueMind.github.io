import './Officer.css';
import '../../../App.css';

import EmailLink from './EmailLink';

export default function AdvisorProfile(
  {
    imgSrc = 'https://drive.google.com/uc?export=view&id=',
    alt = 'Headshot',
    name,
    position,
    email
  }) {
  return (
    <div className='profile'>
      <img className='profilePic' src={imgSrc} alt={alt}/>

      <div className='profileInfo'>
        <div className='profileText'>
          <h3 className='name'>{name}</h3>
          <h4 className='position'>{position}</h4>
        </div>
        <div className='iconRow'>
          <EmailLink email={email} />
        </div>
      </div>
    </div>
  );
};
