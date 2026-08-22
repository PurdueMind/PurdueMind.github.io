import linkedInIcon from '../../../assets/logos/linkedIn.png';

export default function LinkedInLink({ linkedIn, name }) {
  return (
    <a
      className='iconButton'
      href={linkedIn}
      target='_blank'
      rel='noreferrer'
      aria-label={`View ${name}'s LinkedIn profile`}
      data-tooltip='LinkedIn'
    >
      <img className='iconImg' src={linkedInIcon} alt='LinkedIn' />
    </a>
  );
};