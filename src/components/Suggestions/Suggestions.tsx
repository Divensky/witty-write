import './Suggestions.scss';
import { ErrorItem } from '../../api/textGearsApi';

interface SuggestionsProps {
  suggestionsList: ErrorItem[];
}

export default function Suggestions(props: SuggestionsProps) {
  const { suggestionsList } = props;
  const isActive = suggestionsList.length;
  const activeClass = isActive ? 'suggestions_active' : '';

  return (
    <>
      <div className={`suggestions ${activeClass}`}>
        <h2 className="suggestions__title base-title">WittyWrite suggests</h2>
        <div className="suggestions__container">
          {suggestionsList.map(
            (suggestion, index) =>
              suggestion.description && (
                <p key={index}>{JSON.stringify(suggestion.description)}</p>
              )
          )}
        </div>
      </div>
    </>
  );
}
