import './WorkshopPage.css';
import '../../App.css';
import Workshop from './Workshop';

import mlFiles from '../../assets/workshops/ml-workshop.zip';
import cadFiles from '../../assets/workshops/cad-workshop.zip'

const workshopList = require('./workshopList.json');

const fileList = {
    'ml-workshop': mlFiles,
    'cad-workshop': cadFiles
}

export default function WorkshopPage() {
    // get current year
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className='workshopPage'>
            <h1 className='header'>Workshops</h1>
            <div className='workshopContainer'>
                <h2 className="sectionHeader">{year} Workshops</h2>
                {getWorkshops(workshopList.workshops)}
            </div>
        </div>
    );
};

function getWorkshops(workshops) {
    const formattedWorkshops = [];
    for (const index in workshops) {
        const workshop = workshops[index];
        formattedWorkshops.push(<Workshop
            id={workshop.title}
            title={workshop.title}
            description={workshop.description}
            downloadFile={fileList[workshop.id]}
            downloadFilename={workshop.filename}
        />);
    }
    return formattedWorkshops;
}