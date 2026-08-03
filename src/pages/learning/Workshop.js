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
        <button className="downloadButton" onClick={handleDownload}>Download Workshop</button>
    )
}

export default function Workshop({id, pitch, buttonName, description, imgSrc, alt, downloadFile, downloadFilename}) {
    return (
        <div className='workshopDiv' id={id}>
            {imgSrc && (
                <div className='workshopImageDiv'>
                    <img className='workshopImg' src={imgSrc} alt={alt} />
                </div>
            )}
            <div className='workshopInfoDiv'>
                <h3 className='workshopPitch'><b>{pitch}</b></h3>
                <DownloadButton downloadFile={downloadFile} filename={downloadFilename} buttonName={buttonName} />
                <button className='downloadButton' onClick={() => {}}>I know what I'm doing</button>
            </div>
        </div>
    )
};
