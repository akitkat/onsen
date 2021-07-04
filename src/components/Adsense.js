import React, { useEffect } from 'react';

const Adsense = ( props ) => {
  const { currentPath, dataAdSlot} = props
  
  useEffect(() => {
    if (window) {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
    }
  }, [currentPath]);

  return (
    <ins 
      className="adsbygoogle"
      style={{display:'block'}}
      data-ad-client={process.env.GOOGLE_ADSENSE}
      data-ad-slot={dataAdSlot}
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  )
}

export default Adsense
