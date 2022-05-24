export type PropsButton = {
  className?: string;
  id?: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type PropsInput = {
  type: React.HTMLInputTypeAttribute | undefined;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
};

export type PropsLabel = {
  label: string;
  className?: string;
  id?: string;
};

export type PropsTextArea = {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  id?: string;
  placeholder?: string;
};

export interface ComponentProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  format?: React.ElementType;
}

export interface TitleProps extends ComponentProps {
  className?: string;
  id?: string;
  label?: string;
}
