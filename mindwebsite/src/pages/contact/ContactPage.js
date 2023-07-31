import ContactForm from './ContactForm';

import './ContactPage.css';
import '../../App.css';

export default function ContactPage() {
  return (
    <div className='contactPage'>
      <h1 className='header'>Contact Us</h1>
      <h4 id="contactDesc">Contact us at <a className='outlook' href={`mailto:purdueuniversitymind@gmail.com`}>purdueuniversitymind@gmail.com</a> or send us a message below!</h4>

      <ContactForm/>
    </div>
  );
};
