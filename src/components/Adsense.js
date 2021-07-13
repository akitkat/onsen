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
      data-ad-client="ca-pub-1105473512670263"
      data-ad-slot={dataAdSlot}
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  )
}

export default Adsense
