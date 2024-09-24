import '../../App.css';
import './Workshop.css';

export const DownloadButton = ({downloadFile, filename}) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = downloadFile;
        link.download = filename || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
    return (
        <button className="downloadButton" onClick={handleDownload}>Download Workshop Files</button>
    )
}

export default function Workshops({id, title, description, downloadFile}) {
    return (
        <div className='workshop' id={id}>
            <div id='workshopInfo'>
                <h4 className='title'>{title}</h4>
                <h5 className='description'>
                    {expandDescription(description)}
                </h5>
                <DownloadButton downloadFile={downloadFile} filename="workshop.zip"/>
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