import { renderHook, act } from '@testing-library/react-hooks';
import useClearLocationState from '@src/common/hooks/useClearLocationState';
import { Wrapper } from '../../wrapper';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useLocation: jest.fn().mockImplementation(() => {
      return {
        pathname: '/test',
        search: '?something=2',
        state: { someInfo: 'hello world!' },
      };
    }),
  };
});

describe('useClearLocationState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return function for clear location state', () => {
    const { result } = renderHook(() => useClearLocationState(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.clearLocationState).toBe('function');
  });

  test('should have empty location state', () => {
    const { result } = renderHook(() => useClearLocationState(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.clearLocationState();
    });

    expect(mockedNavigate).toBeCalledWith(
      { pathname: '/test', search: '?something=2' },
      { replace: true, state: {} },
    );
  });
});
