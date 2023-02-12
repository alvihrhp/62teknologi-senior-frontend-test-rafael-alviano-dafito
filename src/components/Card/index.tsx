import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
  style?: string;
  action?: (...args: any) => void;
}

const Card: React.FC<Props> = ({ children, style, action }): ReactElement => {
  return (
    <div className={`w-full shadow-lg ${style}`} onClick={action}>
      {children}
    </div>
  );
};

export default Card;
