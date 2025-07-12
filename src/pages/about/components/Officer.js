import './Officer.css';
import '../../../App.css';

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
      <a href={linkedIn}><button id="linkedIn">LinkedIn</button></a>

      <div id='eboardInfo'>
        <h3 className='name'>{name}</h3>
        <h4 className='position'>{position}</h4>
        <h5 className='major'>{major}</h5>
        <a className='email' href={`mailto:${email}`}>{email}</a>
        <div id='spacer'/>
      </div>
    </div>
  );
};
