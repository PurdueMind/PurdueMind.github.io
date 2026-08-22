import { useState, useRef } from 'react';

import emailIcon from '../../../assets/logos/email.png';

// navigator.clipboard is unavailable in some mobile contexts (non-HTTPS,
// older WebViews), so fall back to the execCommand approach there instead
// of letting the missing API throw and crash the page.
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    // clipboard copy isn't supported in this environment; nothing more we can do
  }
  document.body.removeChild(textarea);
}

export default function EmailLink({ email }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(email);

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