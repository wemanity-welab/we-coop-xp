export type PropsLabelInput = {
  label: string;
  type: React.HTMLInputTypeAttribute | undefined;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id?: string;
  placeholder?: string;
};
