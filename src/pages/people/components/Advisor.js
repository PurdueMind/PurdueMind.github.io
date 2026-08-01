import './Officer.css';
import '../../../App.css';

import EmailLink from './EmailLink';

export default function AdvisorProfile(
  {
    id,
    imgSrc = 'https://drive.google.com/uc?export=view&id=',
    alt = '404: No Image',
    name,
    position,
    email
  }) {
  return (
    <div className='profile'>
      <img className='profilePic' id={id} src={imgSrc} alt={alt}/>

      <div id='eboardInfo'>
        <h3 className='name'>{name}</h3>
        <h4 className='position'><i>{position}</i></h4>
        <div className='iconRow'>
          <EmailLink email={email} />
        </div>
      </div>
    </div>
  );
};
