"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallbackSrc: string;
  className: string;
};

const FallbackImage = ({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  className,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleImageError}
      className={className}
    />
  );
};

export default FallbackImage;
