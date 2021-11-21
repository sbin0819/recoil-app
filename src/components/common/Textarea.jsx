import React, { memo, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TextArea = ({ className, value, onChange, onBlur, placeholder }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    ref.current.style.height = '38px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const handleResizeHeight = () => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '38px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  };

  return (
    <AutoResizeTextArea
      className={className}
      value={value}
      onChange={onChange}
      rows={1}
      placeholder={placeholder}
      ref={ref}
      onInput={handleResizeHeight}
      onBlur={onBlur}
    />
  );
};

const AutoResizeTextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  padding: 12px;
  display: block;
  border: none;
  width: 100%;
  outline: none;
  min-height: 38px;
  border-radius: 4px;
  caret-color: lightskyblue;
  box-sizing: border-box;
  line-height: 20px;

  &:focus {
    background: azure;
  }
`;

export default TextArea;
