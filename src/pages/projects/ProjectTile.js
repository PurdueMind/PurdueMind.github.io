import { Link } from 'react-router-dom';

import './ProjectTile.css';

export default function ProjectTile({ slug, imgSrc, alt = '404: No Image', title, description }) {
  const shortDescription = Array.isArray(description) ? description[0] : description;

  return (
    <Link to={`/Projects/${slug}`} className='projectTile'>
      <div className='projectTileImgContainer'>
        <img className='projectTileImg' src={imgSrc} alt={alt} />
      </div>
      <div className='projectTileInfo'>
        <div className='projectTileInfoTop'>
          <h4 className='projectTileTitle'>{title}</h4>
        </div>
        <div className='projectTileInfoBottom'>
          <p className='projectTileDescription'>{shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};