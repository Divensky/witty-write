import { ErrorItem } from '../api/textGearsApi';

export function prepSuggestions(suggestionsList: ErrorItem[]) {
  return suggestionsList.map((suggestion) => {
    const languageKey = Object.keys(suggestion.description || {})[0];
    return {
      id: suggestion.id,
      offset: suggestion.offset,
      length: suggestion.length,
      description: suggestion.description
        ? suggestion.description[languageKey]
        : '',
      language: languageKey,
      bad: suggestion.bad,
      better: suggestion.better,
      type: suggestion.type,
    };
  });
}
