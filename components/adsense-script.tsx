'use client';

import Script from 'next/script';
import { useState } from 'react';

const AdsenseScript = () => {
  const [consent] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedConsent = window.localStorage.getItem('gdpr-consent');
      return storedConsent === 'true';
    }
    return false;
  });

  if (!consent) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5937972178718571`}
      crossOrigin="anonymous"
    />
  );
};

export default AdsenseScript;
