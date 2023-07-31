import './ContactForm.css';

import { useState } from 'react';
import { send } from 'emailjs-com';

export default function ContactForm() {
  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      'service_0ura3q9',
      'template_glym3ip',
      toSend,
      'user_gKePqyx1RkDsz4zzPu7ec'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .then(() => {
        document.getElementById('nameInfo').value = '';
        document.getElementById('emailInfo').value = '';
        document.getElementById('message').value = '';
        alert('Your message has been sent! Please check your email for confirmation.');
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div className="contactForm">
      <form onSubmit={onSubmit}>
        <div id="userInfo">
          <input
            id="nameInfo"
            type='text'
            name='from_name'
            placeholder='Name'
            value={toSend.from_name}
            onChange={handleChange}
            defaultValue="Reset"
          />

          <input
            id="emailInfo"
            type='text'
            name='reply_to'
            placeholder='Email'
            value={toSend.reply_to}
            onChange={handleChange}
            defaultValue="Reset"
          />
        </div>

        <div className="br"/>

        <div>
          <textarea
            id="message"
            type='text'
            name='message'
            placeholder='Message'
            value={toSend.message}
            onChange={handleChange}
            defaultValue="Reset"
          />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}