import React, { useEffect, useState } from 'react';

import { useDebounce } from 'hooks';

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
  validations?: { equation: any; message: string }[];
  delay?: number;
  style?: any;
  styleInput?: any;
  styleSubtitle?: any;
  suffix?: string;
  regexp?: (str: string) => string;
}

const Input: React.FC<IInputProps> = (props) => {
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
    validations,
    delay = 0,
    style,
    styleInput,
    styleSubtitle,
    suffix,
    regexp,
  } = props;

  const [errorInner, setErrorInner] = useState(error);
  const [inputValue, setInputValue] = useState(value);
  const debouncedInputValue = useDebounce(inputValue, delay);

  const handleChange = (str: string) => {
    let typedValue: string | null = null;
    if (regexp) {
      typedValue = regexp(str);
    }
    if (validations) {
      for (let i = 0; i < validations.length; i += 1) {
        const { equation, message } = validations[i];
        const equal = equation(typedValue === null ? str : typedValue);
        if (!equal) {
          setErrorInner(message);
          break; // show only first message if equation returns false
        } else {
          setErrorInner('');
        }
      }
    }
    setInputValue(typedValue === null ? str : typedValue);
  };

  useEffect(() => {
    onChange(debouncedInputValue!);
  }, [debouncedInputValue, onChange]);

  return (
    <div className={`${s.input} ${error || errorInner ? s.invalid : ''}`} style={style}>
      <div className={s.input_wrapper}>
        <input
          disabled={disabled}
          required={required}
          value={inputValue}
          placeholder={placeholder}
          className={className}
          onWheel={(evt) => {
            evt.preventDefault();
          }}
          onChange={(e) => handleChange(e.target.value)}
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
      {(error || errorInner) && (
        <div className={s.invalid_err}>
          <div className={s.invalid_err__text}>*{error || errorInner}</div>
        </div>
      )}
    </div>
  );
};

export default Input;
