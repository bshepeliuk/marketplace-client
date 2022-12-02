import { statusMock } from '../mocks/data';

interface IProps {
  length: number;
}

function createStatsMock({ length = 20 } = {}) {
  return {
    devices: createDeviceStatsMock({ length }),
    statuses: createStatusStatsMock({ length, status: statusMock }),
    categories: createCategoriesStatsMock({ length }),
    customers: createCustomerStatsMock({ length }),
    cities: createCitiesStatsMock({ length }),
    orderMonth: {},
    orderTime: {},
  };
}

function createDeviceStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    brandId: Math.floor(Math.random() * 5),
    id: idx + 1,
    name: `device - ${idx + 1}`,
    quantity: generateRandomInteger({ min: 1, max: 5 }),
    typeId: generateRandomInteger({ min: 1, max: 3 }),
  }));
}

function createStatusStatsMock({ length, status }: { length: number; status: string[] }) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    status: status[Math.floor(Math.random() * status.length)],
    quantity: generateRandomInteger({ min: 1, max: 10 }),
  }));
}

function createCustomerStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    fullName: `Test Customer - ${generateRandomInteger({ min: 1, max: 10 })}`,
    quantity: generateRandomInteger({ min: 1, max: 10 }),
    total: generateRandomInteger({ min: 100000, max: 500000 }),
  }));
}

function createCitiesStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    city: `Test City - ${generateRandomInteger({ min: 1, max: 10 })}`,
    quantity: generateRandomInteger({ min: 1, max: 10 }),
    total: generateRandomInteger({ min: 100000, max: 500000 }),
  }));
}

function createCategoriesStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    name: `Test Category - ${generateRandomInteger({ min: 1, max: 10 })}`,
    quantity: generateRandomInteger({ min: 1, max: 10 }),
    total: generateRandomInteger({ min: 100000, max: 500000 }),
    typeId: generateRandomInteger({ min: 1, max: 10 }),
  }));
}

function createOrderMonthStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    month: `month - ${generateRandomInteger({ min: 1, max: 12 })}`,
    quantity: generateRandomInteger({ min: 1, max: 50 }),
    total: generateRandomInteger({ min: 100000, max: 500000 }),
    index: 1,
  }));
}

function createOrderTimeStatsMock({ length }: IProps) {
  return Array.from({ length }).map((_, idx) => ({
    id: idx + 1,
    hour: generateRandomInteger({ min: 1, max: 24 }),
    quantity: generateRandomInteger({ min: 1, max: 50 }),
    total: generateRandomInteger({ min: 100000, max: 500000 }),
    index: 1,
  }));
}

function generateRandomInteger({ min, max }: { min: number; max: number }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default createStatsMock;
