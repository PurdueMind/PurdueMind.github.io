import '../../App.css';
import './Workshop.css';

const SKIP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe1qXo_KUtuJfKfdbtoN5jIdKV0ntQNn9gHOpjK-QqUIl50tw/viewform';

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
        <button className="button buttonPrimary" onClick={handleDownload}>Download workshop</button>
    )
}

export default function Workshop({id, index, title, pitch, dates, imgSrc, alt, downloadFile, downloadFilename}) {
    const sessions = dates ? dates.split('|').map((d) => d.trim()) : [];

    return (
        <article className='workshopDiv' id={id}>
            {imgSrc && (
                <div className='workshopImageDiv'>
                    <img className='workshopImg' src={imgSrc} alt={alt} />
                </div>
            )}
            <div className='workshopInfoDiv'>
                <span className='workshopCode'>W-{String(index).padStart(2, '0')} · {title}</span>
                <h3 className='workshopPitch'>{pitch}</h3>
                {sessions.length > 0 &&
                    <dl className='workshopDates'>
                        {sessions.map((date, i) => (
                            <div className='workshopDateRow' key={date}>
                                <dt>Session {i + 1}</dt>
                                <dd>{date}</dd>
                            </div>
                        ))}
                    </dl>
                }
                <div className='workshopActions'>
                    <DownloadButton downloadFile={downloadFile} filename={downloadFilename} />
                    <a className='button buttonSecondary' href={SKIP_FORM_URL} target='_blank' rel='noopener noreferrer'>I know what I'm doing</a>
                </div>
            </div>
        </article>
    )
};
