'use client';

import CookieConsent from 'react-cookie-consent';
import { useState } from 'react';

const GdprConsent = () => {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const consent = window.localStorage.getItem('gdpr-consent');
      return !consent;
    }
    return true;
  });

  const handleAccept = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('gdpr-consent', 'true');
    }
  };

  const handleDecline = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('gdpr-consent', 'false');
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      cookieName="gdpr-consent"
      style={{ background: '#1a1a1a' }}
      buttonStyle={{
        background: 'var(--primary)',
        color: 'var(--primary-foreground)',
        fontSize: '13px',
      }}
      declineButtonStyle={{
        background: 'var(--secondary)',
        color: 'var(--secondary-foreground)',
        fontSize: '13px',
      }}
      expires={150}
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
};

export default GdprConsent;
