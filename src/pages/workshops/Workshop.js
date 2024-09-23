import '../../App.css';
import './Workshop.css';

export default function Workshops({id, title, description, downloadFile}) {
    return (
        <div className='workshop' id={id}>
            <div id='workshopInfo'>
                <h4 className='title'>{title}</h4>
                <h5 className='description'>
                    {expandDescription(description)}
                </h5>
                <a href={downloadFile} download='workshop.zip'>Click to download workshop files</a>
            </div>
        </div>
    )
};

// function that takes a list of strings and return a unorder list of html elements
function expandDescription(description) {
    const listItems = [];
    for (const item of description) { listItems.push(<li>{item}</li>); }
    return (<ul>{listItems}</ul>);
  }