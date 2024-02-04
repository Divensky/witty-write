import { fetchTextCheck, ErrorItem } from '../../api/textGearsApi';
import { useState } from 'react';
import './MainContent.scss';
import Suggestions from '../Suggestions/Suggestions';

export default function MainContent() {
  const [textToBeChecked, setTextToBeChecked] = useState(
    'My mother are a doctor, but my father is a angeneer'
  );
  const [suggestionsList, setSuggestionsList] = useState<ErrorItem[]>([]);

  async function handleClick() {
    console.log('textToBeChecked', textToBeChecked);
    const res = await fetchTextCheck(textToBeChecked);
    if (
      !res ||
      !res.response ||
      !res.response.errors ||
      res.response.errors.length <= 0
    ) {
      return;
    }
    console.log('errors found', res.response.errors);
    setSuggestionsList(res.response.errors);

    /* sample text to check:
      'My mother are a doctor, but my father is a angeneer'
    */
  }
  return (
    <>
      <div className="text">
        <h2 className="text__title base-title">Drop text here</h2>
        <div
          contentEditable
          className="text__editable-container"
          onInput={(event: React.FormEvent<HTMLDivElement>) => {
            setTextToBeChecked(event.currentTarget.textContent || '');
          }}
        >
          {textToBeChecked}
        </div>
        <div className="text__button-container">
          <button onClick={handleClick}>Check my text</button>
        </div>
      </div>
      <Suggestions suggestionsList={suggestionsList} />
    </>
  );
}
