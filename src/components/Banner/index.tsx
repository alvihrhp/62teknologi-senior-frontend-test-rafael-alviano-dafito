import React, { ReactElement } from "react";

interface Props {
  wrapperStyle?: string;
  bgImage: string;
  bgStyle: string;
  children: React.ReactNode;
  imgStyle?: string;
}

const Banner: React.FC<Props> = ({
  wrapperStyle,
  bgImage,
  bgStyle,
  children,
}): ReactElement => {
  return (
    <div className={`w-full h-full relative ${wrapperStyle}`}>
      <div
        className={`w-full h-full absolute ${bgStyle} top-0 left-0 z-10`}
      ></div>
      <img src={bgImage} className={`w-full h-full absolute`} />
      {children}
    </div>
  );
};

export default Banner;
