import { useMemo } from "react";

const VideoEmbed = ({ embedUrl }) => {
  const memoizedEmbedUrl = useMemo(() => embedUrl, [embedUrl]);

  return (
    <iframe
      src={memoizedEmbedUrl}
      width="100%"
      height="500px"
      allowFullScreen
      className="shadow-lg"
      title={` Phim`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};

export default VideoEmbed;
