import type { ChangeEvent } from "react";

type AnswerProps = {
  value: string;
  label: string;
  name: string;
  disabled: boolean;
  onChange: (value: string) => void;
};
const Answer = ({ value, label, name, onChange, disabled }: AnswerProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-full flex flex-row hover:bg-neutral-900 p-2">
      <input
        id={`answer-${value}`}
        name={name}
        type="radio"
        value={value}
        onChange={handleOnChange}
        className="mr-1"
        disabled={disabled}
      />
      <label htmlFor={`answer-${value}`} className="flex-grow-1 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Answer;
