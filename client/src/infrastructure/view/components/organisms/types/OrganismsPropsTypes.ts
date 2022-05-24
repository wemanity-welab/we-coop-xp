export type FormProps = {
  formStructure: FormStructure;
  children?: React.ReactNode;
};

export type FormStructure = {
  title: string;
  titleFormat: React.ElementType;
  className: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  form: InputType[];
};

export type InputType = {
  label: string;
  type: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  className?: string;
  placeholder?: string;
};
