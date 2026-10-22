import { Link } from 'react-router-dom';

import './Footer.css';
import '../App.css'

import mindLogo from '../assets/logos/mindLogo.png'
// import facebookLogo from '../assets/logos/facebook.png'
import instagramLogo from '../assets/logos/instagram.png'
import linkedInLogo from '../assets/logos/linkedIn.png'
import slackLogo from '../assets/logos/slack.svg'
// import twitterLogo from '../assets/logos/twitter.png'
// import youtubeLogo from '../assets/logos/youtube.png'
import NAV_ITEMS from '../navbar/navItems';
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, SLACK_INVITE_URL } from '../socialLinks';

// Entries without an icon render as a text label. Links left empty in
// socialLinks.js are skipped.
const SOCIALS = [
  { label: 'Instagram', href: INSTAGRAM_URL, icon: instagramLogo },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: linkedInLogo },
  { label: 'Slack', href: SLACK_INVITE_URL, icon: slackLogo },
  // { label: 'Facebook', href: 'https://www.facebook.com/PurdueMIND/', icon: facebookLogo },
  // { label: 'Twitter', href: 'https://twitter.com/purduemind?lang=en', icon: twitterLogo },
  // { label: 'YouTube', href: 'https://www.youtube.com/channel/UC6Dv-UygUz6vUts8L8hGi8g/featured', icon: youtubeLogo },
].filter((social) => social.href);

var year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='container footerGrid'>
        <div className='footerCol'>
          <img className='footerLogo' src={mindLogo} alt='MIND Logo' />
          <p className='footerTagline'>
            Medical Innovation, Networking, and Design Club at Purdue University.
          </p>
        </div>

        <div className='footerCol'>
          <h3 className='footerHeading'>Sitemap</h3>
          {NAV_ITEMS.map((item) => (
            <Link className='footerLink' key={item.label} to={item.to}>{item.label}</Link>
          ))}
        </div>

        <div className='footerCol'>
          <h3 className='footerHeading'>Connect</h3>
          <a className='footerLink' href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <div className='footerSocials'>
            {SOCIALS.map((social) => (
              <a
                className={`footerSocial ${social.icon ? '' : 'footerSocialText'}`}
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noreferrer'
                aria-label={social.label}
              >
                {social.icon ? <img src={social.icon} alt={social.label} /> : social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='footerBar'>
        <div className='container footerBarInner'>
          <span>© {year} Purdue MIND</span>
          <span>Created and maintained by Purdue MIND</span>
        </div>
      </div>
    </footer>
  );
}
