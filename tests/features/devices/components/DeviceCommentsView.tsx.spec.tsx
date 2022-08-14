/* eslint-disable max-len */
import { fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import DeviceCommentsView from '@features/devices/components/DeviceCommentsView';
import calculateAvgRating from '@features/devices/helpers/calculateAvgRating';
import useEvaluateDevice from '@features/devices/hooks/useEvaluateDevice';
import { BASE_API_URL } from '@src/common/constants';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

jest.mock('@features/devices/hooks/useEvaluateDevice');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ deviceId: 2 }),
}));

const server = setupServer();

const rootState = {
  entities: {
    devices: { 2: { id: 2, name: 'HP Pavillion 15 eh1021-ua', comments: [] } },
    comments: {},
  },
  devices: {
    isEvaluating: false,
    isEvaluatingError: false,
  },
  comments: {
    isCreating: false,
  },
  auth: {
    user: { id: 22, fullName: 'Tony Stark', role: 'BUYER' },
    isLoggedIn: true,
  },
};

const device = {
  id: 2,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [
    {
      deviceId: 2,
      id: 1,
      url: 'https://some-image.jpg',
    },
  ],
  info: [
    {
      deviceId: 2,
      id: 42,
      typeId: 1,
      title: 'Microprocessor',
      description: 'Intel Core i7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  ratings: [
    {
      deviceId: 2,
      id: 21,
      rate: 2,
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  comments: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('[COMPONENTS]: DeviceCommentsView', () => {
  const evaluateMock = jest.fn();

  beforeAll(() => {
    server.listen();
  });
  afterAll(() => server.close());

  beforeEach(() => {
    (useEvaluateDevice as jest.Mock).mockImplementation(() => ({
      evaluate: evaluateMock,
    }));
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should render star rating correctly.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/comments/:deviceId`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            comments: [],
          }),
        );
      }),
    );

    const { container } = setupAndRenderComponent({
      state: rootState,
      component: DeviceCommentsView,
      props: { device },
    });

    const filledStars = container.querySelectorAll(
      '[data-star-state="filled"]',
    );

    const avgRating = calculateAvgRating(device.ratings);

    expect(filledStars).toHaveLength(avgRating);
  });

  test('rating component for device should has 5 available stars for selection.', async () => {
    server.use(
      rest.get(`${BASE_API_URL}/comments/:deviceId`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            comments: [],
          }),
        );
      }),
    );

    const { container } = setupAndRenderComponent({
      state: rootState,
      component: DeviceCommentsView,
      props: { device },
    });

    const numberOfStars = 5;

    for (let i = 1; i <= numberOfStars; i += 1) {
      expect(container.querySelectorAll(`[data-star-id="${i}"]`)).toHaveLength(
        1,
      );
    }
  });

  test('should select 5 stars.', async () => {
    const clientX = 240;
    const left = 51;
    const width = 200;

    Element.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
      left,
      width,
      x: left,
      y: 250,
      height: 40,
      top: 250,
      right: 251,
      bottom: 290,
    });

    server.use(
      rest.get(`${BASE_API_URL}/comments/:deviceId`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            comments: [],
          }),
        );
      }),
    );

    server.use(
      rest.post(`${BASE_API_URL}/ratings`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            rating: {
              id: 1,
              rate: 5,
              deviceId: device.id,
              userId: 1,
            },
          }),
        );
      }),
    );

    const { container } = setupAndRenderComponent({
      state: rootState,
      component: DeviceCommentsView,
      props: { device },
    });

    const Star = container.querySelector(
      '[data-star-id="5"]',
    ) as HTMLDivElement;

    fireEvent.click(Star, { clientX });

    const totalStars = 5;
    const precision = 0.5;

    const positionX = (clientX - left) / width;
    const numberInStars = positionX * totalStars;
    // prettier-ignore
    const nearestNumber = Math.round((numberInStars + precision) / precision) * precision;

    expect(evaluateMock).toBeCalledWith({
      deviceId: device.id,
      rating: nearestNumber,
    });
  });
});
