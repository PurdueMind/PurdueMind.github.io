import './Officer.css';
import '../../../App.css';

import EmailLink from './EmailLink';
import LinkedInLink from './LinkedInLink';

export default function OfficerProfile(
  {
    imgSrc = "",
    alt = "Headshot",
    name,
    position,
    major,
    email,
    linkedIn
  }) {
  return (
    <div className='profile'>
      <img className='profilePic' src={imgSrc} alt={alt} />

      <div className='profileInfo'>
        <div className='profileText'>
          <h3 className='name'>{name}</h3>
          <h4 className='position'>{position}</h4>
          <span className='major'>{major}</span>
        </div>
        <div className='iconRow'>
          <LinkedInLink linkedIn={linkedIn} name={name} />
          <EmailLink email={email} />
        </div>
      </div>
    </div>
  );
};
