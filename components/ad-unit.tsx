'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type AdUnitProps = {
  pId: string; // Your AdSense Publisher ID
  adSlot: string; // The data-ad-slot for this specific ad unit
  adFormat?: string; // e.g., 'auto', 'fluid', 'rectangle'
  fullWidthResponsive?: boolean; // For responsive ads
  adLayout?: string;
  style?: React.CSSProperties;
};

const AdUnit: React.FC<AdUnitProps> = ({
  pId,
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  adLayout,
  style = { display: 'block' },
}) => {
  const pathname = usePathname();

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, [pathname]); // Re-run on route changes

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div style={{ 
        width: '100%', 
        height: '200px', 
        background: '#f0f0f0', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '2px dashed #ccc', 
        borderRadius: '8px', 
        color: '#666', 
        fontSize: '16px', 
        fontWeight: 'bold' 
      }}>
        Ad Placeholder
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={`ca-pub-${pId}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
    ></ins>
  );
};

export default AdUnit;
