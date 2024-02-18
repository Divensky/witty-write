import { useEffect, useRef } from 'react';
// https://dtang.dev/using-content-editable-in-react/, https://www.phind.com/search?cache=rrqdjhik8ydrhbq57mo8etxd&source=sidebar
// https://dmitripavlutin.com/react-useref/

interface ContentEditableProps {
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onInput?: React.FormEventHandler;
  value: string;
  onChange: (newValue: string) => void;
}

export default function ContentEditable({
  value,
  onChange,
}: ContentEditableProps) {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      contentEditableRef.current &&
      contentEditableRef.current.textContent !== value
    ) {
      contentEditableRef.current.textContent = value;
    }
  }, [value]);

  const handleInput: React.FormEventHandler = (evt) => {
    console.log(
      'Input event target textContent: ',
      evt.currentTarget.textContent
    );
    onChange(evt.currentTarget.textContent || '');
  };

  const handleFocus: React.FocusEventHandler = (evt) => {
    console.log('Focus event occurred');
    console.log('event target: ', evt.target);
  };

  const handleBlur: React.FocusEventHandler = (evt) => {
    console.log('Blur event occurred');
    console.log('event target: ', evt.target);
  };

  return (
    <div
      contentEditable
      ref={contentEditableRef}
      className="text__editable-container"
      onInput={(evt) => handleInput(evt)}
      onFocus={(evt) => handleFocus(evt)}
      onBlur={(evt) => handleBlur(evt)}
    ></div>
  );
}
