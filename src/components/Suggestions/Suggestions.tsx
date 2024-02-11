import './Suggestions.scss';
import { ErrorItem } from '../../api/textGearsApi';
import { prepSuggestions } from '../../utils/prepSuggestions';

interface SuggestionsProps {
  suggestionsList: ErrorItem[];
}

export default function Suggestions(props: SuggestionsProps) {
  const { suggestionsList } = props;
  const isActive = suggestionsList.length;
  const activeClass = isActive ? 'suggestions_active' : '';
  const preppedSuggestions = prepSuggestions(suggestionsList);

  return (
    <>
      <aside className={`suggestions ${activeClass}`}>
        <h2 className="suggestions__title base-title">WittyWrite suggests</h2>
        <div className="suggestions__container">
          {preppedSuggestions.map(
            (suggestion, index) =>
              suggestion.description && (
                <div key={index} className="suggestions__item">
                  <p>{suggestion.description}</p>
                  <p>
                    Word <strong>{suggestion.bad}</strong>{' '}
                    {suggestion.better && suggestion.better.length > 0
                      ? 'may need to be changed to '
                      : 'may need to be corrected.'}
                    {suggestion.better?.map((word, index) => (
                      <span key={index}>
                        <strong className="suggestions__better-word">
                          {word}
                        </strong>
                        {suggestion.better &&
                          index < suggestion.better?.length - 1 &&
                          word.length > 0 &&
                          ' | '}
                      </span>
                    ))}
                  </p>
                </div>
              )
          )}
        </div>
      </aside>
    </>
  );
}
