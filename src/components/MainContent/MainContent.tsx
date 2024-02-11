import { fetchTextCheck, ErrorItem } from '../../api/textGearsApi';
import { useState, useEffect } from 'react';
import './MainContent.scss';
import Suggestions from '../Suggestions/Suggestions';
const MIN_INPUT_LENGTH = 4;

export default function MainContent() {
  const [textToBeChecked, setTextToBeChecked] = useState('');
  const [suggestionsList, setSuggestionsList] = useState<ErrorItem[]>([]);
  // const [isFeteching, setIsFetching] = useState(false);
  // const defaultText = 'My mother are a doctor, but my father is a angeneer';

  async function fetchSuggestions(textToBeChecked: string) {
    const res = await fetchTextCheck(textToBeChecked);
    return res?.response?.errors || [];
  }

  useEffect(() => {
    const populateSuggestionsList = async (textToBeChecked: string) => {
      console.log('textToBeChecked', textToBeChecked);
      if (textToBeChecked.trim() === '') {
        setSuggestionsList([]);
        return;
      } else if (textToBeChecked.trim().length < MIN_INPUT_LENGTH) {
        return;
      }
      const fetchedSuggestions = await fetchSuggestions(textToBeChecked);
      console.log('fetched suggestions - errors found', fetchedSuggestions);
      setSuggestionsList(fetchedSuggestions);
    };

    // todo: implement debounce, see https://chat.openai.com/share/726d0a64-ce8a-426d-839c-3cee858552ce

    populateSuggestionsList(textToBeChecked);
  }, [textToBeChecked]);

  async function handleClick() {
    /* sample text to check:
      'My mother are a doctor, but my father is a angeneer'
    */
  }

  const handleInput: React.FormEventHandler = (evt) => {
    console.log(
      'Input event target textContent: ',
      evt.currentTarget.textContent
    );
    setTextToBeChecked(evt.currentTarget.textContent || '');
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
    <>
      <div className="text">
        <h2 className="text__title base-title">Drop Your Text Here</h2>
        <div
          contentEditable
          className="text__editable-container"
          onInput={(evt) => handleInput(evt)}
          onFocus={(evt) => handleFocus(evt)}
          onBlur={(evt) => handleBlur(evt)}
        ></div>
        <div className="text__button-container">
          <button onClick={handleClick}>Insert sample text</button>
        </div>
      </div>
      <Suggestions suggestionsList={suggestionsList} />
    </>
  );
}
