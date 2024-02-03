import './Suggestions.scss';
import { ErrorItem } from '../../api/textGearsApi';

interface SuggestionsProps {
  suggestionsList: ErrorItem[];
}

export default function Suggestions(props: SuggestionsProps) {
  const { suggestionsList } = props;

  return (
    <>
      <div className="suggestions">
        <h2 className="suggestions__title base-title">All suggestions</h2>
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
