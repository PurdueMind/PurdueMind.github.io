import { Link } from 'react-router-dom';

import './ProjectTile.css';

export default function ProjectTile({ slug, code, imgSrc, alt = '404: No Image', title, awardCount = 0, fit, description }) {
  const shortDescription = Array.isArray(description) ? description[0] : description;

  return (
    <Link to={`/Projects/${slug}`} className='projectTile'>
      <div className={`projectTileImgContainer ${fit === 'contain' ? 'projectTileImgContain' : ''}`}>
        <img className='projectTileImg' src={imgSrc} alt={alt} />
      </div>
      <div className='projectTileInfo'>
        <div className='projectTileMeta'>
          <span className='projectTileCode'>{code}</span>
          {awardCount > 0 &&
            <span className='projectTileAward'>{awardCount} {awardCount === 1 ? 'award' : 'awards'}</span>
          }
        </div>
        <h3 className='projectTileTitle'>{title}</h3>
        <p className='projectTileDescription'>{shortDescription}</p>
        <span className='projectTileLink'>View details →</span>
      </div>
    </Link>
  );
};
