import './Project.css';
import '../../App.css';

export default function Projects(
  {
    id,
    imgSrc = 'https://drive.google.com/uc?export=view&id=1pnitzFNzovrKFX_8tFv22vjohCrWPdvp',
    alt = '404: No Image',
    title,
    description
  }) {
  return (
    <div className='project' id={id}>
      <div id='projectInfo'>
        <h4 className='title'>{title}</h4>
        <h5 className='description'>{description}</h5>
      </div>
    </div>
  );
};
