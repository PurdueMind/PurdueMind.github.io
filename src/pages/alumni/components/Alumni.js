import './Alumni.css';
import '../../about/components/Officer.css';
import '../../../App.css';

import defaultImg from '../../../assets/headshots/default.png'

export default function AlumniProfile(
  {
    id,
    imgSrc = defaultImg,
    alt = '404: No Image',
    name,
    position,
    major,
    minor = '',
    outlook = ''
  }) {
  return (
    <div className='profile'>
      <img className='profilePic' id={id} src={imgSrc} alt={alt} />

      <div id='eboardInfo'>
        <h3 className='name'>{name}</h3>
        <h4 className='position'>{position}</h4>
        <h5 className='major'>{major}</h5>
        <h5 className='major'>{minor}</h5>
        <a className='outlook' href={`mailto:${outlook}`}>{outlook}</a>
        <br/>
      </div>

      <div id='spacer'/>
    </div>
  );
};
