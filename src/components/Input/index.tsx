import React, { ReactElement } from "react";

interface Props {
  attr: { [key: string]: any };
  inputs: { [key: string]: any }[];
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>;
}

const Input: React.FC<Props> = ({ attr, inputs, setInputs }): ReactElement => {
  const handleChangeInputs = (name: string, value: string | number): void => {
    const newInputs: { [key: string]: any }[] = inputs.map(
      (input: { [key: string]: any }) => {
        if (name === input.name) {
          return {
            ...input,
            value: value,
          };
        }
        return {
          ...input,
        };
      }
    );

    setInputs(newInputs);
  };

  const handleChangeChebox = (alias: string): void => {
    const newInputs = inputs.map((input: { [key: string]: any }) => {
      if (input.alias === alias) {
        return {
          ...input,
          isActive: !input.isActive,
        };
      }
      return {
        ...input,
      };
    });

    setInputs(newInputs);
  };

  return attr.type === "checkbox" ? (
    <input
      {...attr}
      className="rounded w-[20px] h-[20px] border-0 ouline-none"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeChebox(e.currentTarget.name);
      }}
    />
  ) : (
    <input
      {...attr}
      className="w-full py-3 px-5 rounded-lg text-white bg-neutral-600 text-sm"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChangeInputs(e.currentTarget.name, e.currentTarget.value)
      }
    />
  );
};

export default Input;
