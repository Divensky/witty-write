import { fetchTextCheck, ErrorItem } from '../../api/textGearsApi';
import { useState, useEffect } from 'react';
import './MainContent.scss';
import Suggestions from '../Suggestions/Suggestions';
import ContentEditable from '../ContentEditable/ContentEditable';
const MIN_INPUT_LENGTH = 4;
const DEFAULT_TEXT =
  'Please type or paste your text or use the button below to insert a sample';
const sampleTexts = ['My mother are a doctor, but my father is a angeneer'];

export default function MainContent() {
  const [textToBeChecked, setTextToBeChecked] = useState(DEFAULT_TEXT);
  const [suggestionsList, setSuggestionsList] = useState<ErrorItem[]>([]);
  // const [isFeteching, setIsFetching] = useState(false);
  // const defaultText = 'My mother are a doctor, but my father is a angeneer';

  async function fetchSuggestions(textToBeChecked: string) {
    const res = await fetchTextCheck(textToBeChecked);
    return res?.response?.errors || [];
  }

  useEffect(() => {
    const populateSuggestionsList = async (textToBeChecked: string) => {
      console.log(
        'textToBeChecked at populateSuggestionsList',
        textToBeChecked
      );
      if (textToBeChecked.trim() === '') {
        setSuggestionsList([]);
        return;
      } else if (
        textToBeChecked.trim().length < MIN_INPUT_LENGTH ||
        textToBeChecked.trim() === DEFAULT_TEXT
      ) {
        return;
      }
      //todo: implement caching so we don't fetch the same data twice, for example by using Set
      const fetchedSuggestions = await fetchSuggestions(textToBeChecked);
      console.log('fetched suggestions - errors found', fetchedSuggestions);
      setSuggestionsList(fetchedSuggestions);
    };

    // todo: implement debounce, see https://chat.openai.com/share/726d0a64-ce8a-426d-839c-3cee858552ce
    // todo: implement imput sanitation

    populateSuggestionsList(textToBeChecked);
  }, [textToBeChecked]);

  async function handleClick() {
    setTextToBeChecked(() => sampleTexts[0]);
    //todo: implement several versions of texts 
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
        <ContentEditable
          value={textToBeChecked}
          onChange={setTextToBeChecked}
          onFocus={(evt) => handleFocus(evt)}
          onBlur={(evt) => handleBlur(evt)}
        />
        <div className="text__button-container">
          <button onClick={handleClick}>Insert sample text</button>
        </div>
      </div>
      <Suggestions suggestionsList={suggestionsList} />
    </>
  );
}
