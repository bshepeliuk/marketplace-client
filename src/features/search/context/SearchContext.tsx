import React, { ChangeEvent, createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Devices } from '@src/common/api/Api';
import { IDevice } from '@src/features/devices/types';
import { routes } from '@src/app/Router';

interface IContext {
  searchValue: string;
  isEmpty: boolean;
  isLoading: boolean;
  isVisible: boolean;
  suggestions: IDevice[];
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSearch: () => undefined | void;
  onEnterPress: (evt: React.KeyboardEvent<HTMLElement>) => undefined | void;
}

export const SearchContext = createContext<IContext | undefined>(undefined);

function SearchProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [searchValue, setSearchValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [suggestions, setSuggestions] = useState<IDevice[]>([]);

  const hasNoSearchValue = searchValue.trim() === '';

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    const hasValue = value.trim() !== '';

    if (hasValue) {
      setSearchValue(value);
      setIsVisible(true);
    } else {
      onClear();
    }
  };

  const onClear = () => {
    setSearchValue('');
    setIsVisible(false);
  };

  const onSearch = () => {
    if (hasNoSearchValue) return;

    navigateToSearchResult();
  };

  const onEnterPress = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (hasNoSearchValue) return;

    const hasClickOnEnterKey = evt.code.toLowerCase() === 'enter';

    if (hasClickOnEnterKey) navigateToSearchResult();
  };

  const navigateToSearchResult = () => {
    navigate(`${routes.searchResult}?name=${searchValue}`);
    onClear();
  };

  const fetchSuggestions = async (value: string) => {
    try {
      const { data } = await Devices.get({
        limit: 20,
        offset: 0,
        filters: [['name', value]],
      });

      const hasNoSuggestions = data.devices.length === 0;

      if (hasNoSuggestions) setIsEmpty(true);

      setSuggestions(data.devices);
    } catch (error) {
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasNoSearchValue) return;

    setIsLoading(true);
    setIsEmpty(false);

    timeoutId.current = setTimeout(() => fetchSuggestions(searchValue), 2000);

    return () => {
      clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
    };
  }, [searchValue]);

  const values = {
    searchValue,
    isEmpty,
    isLoading,
    isVisible,
    suggestions,
    onChange,
    onClear,
    onSearch,
    onEnterPress,
  };

  return <SearchContext.Provider value={values}>{children}</SearchContext.Provider>;
}

export default SearchProvider;
