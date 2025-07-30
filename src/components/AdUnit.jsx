import { useEffect } from "react";

const AdUnit = () => {
  useEffect(() => {
    try {
      // Push the ad only if adsbygoogle is loaded
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Error loading ad:", error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5970361720369506"
      data-ad-slot="3037571693"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;
