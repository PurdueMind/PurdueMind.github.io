import './Officer.css';
import '../../../App.css';

export default function AdvisorProfile(
  {
    id,
    imgSrc = 'https://drive.google.com/uc?export=view&id=',
    alt = '404: No Image',
    name,
    position
  }) {
  return (
    <div className='profile'>
      <img className='profilePic' id={id} src={imgSrc} alt={alt}/>

      <div id='eboardInfo'>
        <h3 className='name'>{name}</h3>
        <h5 className='position'>{position}</h5>
      </div>
    </div>
  );
};
