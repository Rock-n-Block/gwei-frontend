import { FC } from 'react';

import s from './Input.module.scss';

interface IInputProps {
  disabled?: boolean;
  type?: 'text' | 'number';
  className?: string;
  value?: string;
  onChange: (str: string) => void;
  error?: string;
  required?: boolean;
  subtitle?: string;
  placeholder?: string;
  style?: any;
  styleInput?: any;
  styleSubtitle?: any;
  suffix?: string;
}

const Input: FC<IInputProps> = (props) => {
  const {
    disabled,
    type = 'text',
    className,
    value,
    onChange,
    error,
    subtitle,
    required = false,
    placeholder = '',
    style,
    styleInput,
    styleSubtitle,
    suffix,
  } = props;

  return (
    <div className={`${s.input} ${error ? s.invalid : ''}`} style={style}>
      <div className={s.input_wrapper}>
        <input
          disabled={disabled}
          required={required}
          value={value}
          placeholder={placeholder}
          className={className}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          style={styleInput}
        />
        {suffix && <div className={s.input_suffix}>{suffix}</div>}
      </div>
      {subtitle && (
        <div className={s.input_subtitle} style={styleSubtitle}>
          {subtitle}
        </div>
      )}
      {error && (
        <div className={s.invalid_err}>
          <div className={s.invalid_err__text}>*{error}</div>
        </div>
      )}
    </div>
  );
};

export default Input;
