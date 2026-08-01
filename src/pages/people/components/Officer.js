import './Officer.css';
import '../../../App.css';

import EmailLink from './EmailLink';
import LinkedInLink from './LinkedInLink';

export default function OfficerProfile(
  {
    id,
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
      <img className='profilePic' id={id} src={imgSrc} alt={alt} />

      <div id='eboardInfo'>
        <h3 className='name'>{name}</h3>
        <h4 className='position'><i>{position}</i></h4>
        <span className='major'>{major}</span>
        <div className='iconRow'>
          <LinkedInLink linkedIn={linkedIn} name={name} />
          <EmailLink email={email} />
        </div>
      </div>
    </div>
  );
};
