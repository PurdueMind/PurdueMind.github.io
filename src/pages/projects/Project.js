import './Project.css';
import '../../App.css';

export default function Projects(
  {
    id,
    imgSrc,
    alt = '404: No Image',
    title,
    description
  }) {
  description = expandDescription(description);
  return (
    <div className='project' id={id}>
      <div id='projectInfo'>
        <h4 className='title'>{title}</h4>
        <img className='projectImg' src={imgSrc} alt={alt} />
        <h5 className='description'>
          {description}
        </h5>
      </div>
    </div>
  );
};
// function that takes a list of strings and return a unorder list of html elements
function expandDescription(description) {
  const listItems = [];
  for (const item of description) { listItems.push(<li>{item}</li>); }
  return (<ul>{listItems}</ul>);
}