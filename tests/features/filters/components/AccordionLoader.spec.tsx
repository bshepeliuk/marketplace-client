import AccordionLoader from '@src/features/filters/components/Accordion/components/AccordionLoader';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

describe('[COMPONENTS]: AccordionLoader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render accordion loader.', () => {
    const { getAllByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: AccordionLoader,
    });

    expect(getAllByText('loading...', { exact: false }).length).toBeGreaterThan(0);
  });
});
