import { useEffect, useRef, useState } from 'react';
import { OnChangeValue, SingleValue } from 'react-select';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import createOption from '@src/common/utils/createSelectOption';
import useCreateCategory from '@src/features/categories/hooks/useCreateCategory';
// eslint-disable-next-line max-len
import useCreateCategoryOptions from '@features/categories/hooks/useCreateCategoryOptions';
import useFetchCategories from '@src/features/categories/hooks/useFetchCategories';
import { categoriesSelector } from '@features/categories/selectors/categoriesSelector';
import { Option, SelectActionTypes } from '@src/common/types/selectTypes';

const selectInitState = {
  isClearable: true,
  isSearchable: true,
  isDisabled: false,
  isLoading: false,
};

const useServeCategorySelect = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [shouldClear, setShouldClear] = useState(false);
  const categories = useTypedSelector(categoriesSelector);
  const [option, setOption] = useState<SingleValue<Option> | null>(null);
  const [selectState, setSelectState] = useState(selectInitState);
  const { fetchCategoriesBy } = useFetchCategories();
  const { createCategoryOptions } = useCreateCategoryOptions();
  const { createCategory } = useCreateCategory();

  const options = createCategoryOptions(categories.items);

  useEffect(() => {
    if (categories.isLoading) {
      setSelectState((prev) => ({
        ...prev,
        isDisabled: true,
        isLoading: true,
      }));
    } else {
      setSelectState((prev) => ({
        ...prev,
        isDisabled: false,
        isLoading: false,
      }));
    }
  }, [categories.isLoading]);

  const onCreateOption = async (value: string) => {
    setSelectState((prev) => ({ ...prev, isLoading: true, isDisabled: true }));

    const { payload } = await createCategory({ name: value });

    if (payload === undefined) return;

    if ('entities' in payload && 'result' in payload) {
      const category = payload.entities.categories[payload.result];

      setOption(createOption(category.name));
    }

    setSelectState((prev) => ({
      ...prev,
      isLoading: false,
      isDisabled: false,
    }));
  };

  const loadOptions = (
    value: string,
    // eslint-disable-next-line no-unused-vars
    callback: (options: Array<Option>) => void,
  ) => {
    clearTimeout(timeoutId.current as ReturnType<typeof setTimeout>);

    timeoutId.current = setTimeout(async () => {
      const { data } = await fetchCategoriesBy({ name: value });

      const createdOptions = createCategoryOptions(data.types);

      callback(createdOptions);
    }, 1500);
  };

  const handleChange = (
    newValue: OnChangeValue<Option, false>,
    actionMeta: { action: SelectActionTypes },
  ) => {
    if (actionMeta.action === 'clear') {
      setOption(null);
      setShouldClear(true);
      return;
    }

    setOption(newValue);
  };

  return {
    onCreateOption,
    loadOptions,
    handleChange,
    option,
    options,
    setOption,
    selectState,
    shouldClear,
    setSelectState,
  };
};

export default useServeCategorySelect;
