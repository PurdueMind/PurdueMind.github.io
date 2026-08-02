import '../../App.css';
import './Workshop.css';

export const DownloadButton = ({downloadFile, filename, buttonName}) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = downloadFile;
        link.download = filename || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
    return (
        <button className="downloadButton" onClick={handleDownload}>{buttonName}</button>
    )
}

export default function Workshop({id, title, buttonName, description, imgSrc, alt, downloadFile, downloadFilename}) {
    return (
        <div className='workshopDiv' id={id}>
            <div className='workshopImageDiv'>
                <img className='workshopImg' src={imgSrc} alt={alt} />
            </div>
            <div id='workshopInfoDiv'>
                <h4 className='title'>{title}</h4>
                <DownloadButton downloadFile={downloadFile} filename={downloadFilename} buttonName={buttonName} />
                <button className='downloadButton' onClick={() => {}}>I know what I'm doing</button>
            </div>
        </div>
    )
};

// function that takes a list of strings and return a unorder list of html elements
// function expandDescription(description) {
//     const listItems = [];
//     for (const item of description) { listItems.push(<li>{item}</li>); }
//     return (<ul>{listItems}</ul>);
//   }
