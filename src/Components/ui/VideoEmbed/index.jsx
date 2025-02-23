import { useMemo } from "react";

const VideoEmbed = ({ embedUrl }) => {
  const memoizedEmbedUrl = useMemo(() => embedUrl, [embedUrl]);

  return (
    <iframe
      src={memoizedEmbedUrl}
      allowFullScreen
      className="shadow-lg w-full h-[75vh]"
      title={` Phim`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
};

export default VideoEmbed;
