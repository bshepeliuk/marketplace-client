import React, {
  ChangeEvent,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  // eslint-disable-next-line no-unused-vars
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSearch: () => undefined | void;
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

    navigate(`${routes.searchResult}?name=${searchValue}`);
    onClear();
  };

  useEffect(() => {
    setIsLoading(true);
    setIsEmpty(false);

    if (hasNoSearchValue) return;

    timeoutId.current = setTimeout(() => {
      Devices.get({
        limit: 20,
        offset: 0,
        filters: [['name', searchValue]],
      })
        .then((res) => {
          const hasNoSuggestions = res.data.devices.length === 0;

          setSuggestions(res.data.devices);
          setIsLoading(false);

          if (hasNoSuggestions) {
            setIsEmpty(true);
          }
        })
        .catch(() => {
          setIsEmpty(true);
        });
    }, 2000);

    return () => {
      clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);
    };
  }, [searchValue]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    searchValue,
    isEmpty,
    isLoading,
    isVisible,
    suggestions,
    onChange,
    onClear,
    onSearch,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
}

export default SearchProvider;
