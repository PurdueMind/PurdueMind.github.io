import { useState, useRef } from 'react';

import emailIcon from '../../../assets/logos/email.png';

export default function EmailLink({ email }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);

    clearTimeout(timeoutRef.current);
    setCopied(false);
    requestAnimationFrame(() => setCopied(true));
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button
        type='button'
        className='iconButton'
        onClick={handleClick}
        aria-label={`Copy ${email} to clipboard`}
        data-tooltip='Copy email'
      >
        <img className='iconImg' src={emailIcon} alt='Email' />
      </button>
      {copied && <div className='copyToast'>Email copied to clipboard</div>}
    </>
  );
};