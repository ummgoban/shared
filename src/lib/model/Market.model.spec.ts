import {Market} from './Market.model';
import {MarketType} from '../types/market.type';

describe('Market', () => {
  it('should be defined', () => {
    expect(Market).toBeDefined();
  });

  const market: Market = new Market({
    id: 1,
    name: 'test',
    openHours: [
      {
        dayOfWeek: 'MONDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'TUESDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'WEDNESDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'THURSDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'FRIDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'SATURDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
      {
        dayOfWeek: 'SUNDAY',
        openTime: '09:00',
        closeTime: '18:00',
      },
    ],
    address: 'test',
    products: [],
    imageUrls: [],
    summary: 'test',
  });

  it('should isOpen return true when market is open', () => {
    const mockDate = new Date('2025-08-08T10:00:00.000+09:00');
    vitest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(market.isOpen()).toBeTruthy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is closed', () => {
    const mockDate = new Date('2025-08-08T19:00:00.000+09:00');
    vitest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(market.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should isOpen return false when market is not open day', () => {
    // 2050-08-08 금요일
    const mockDate = new Date('2025-08-08T10:00:00.000+09:00');
    vitest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const closedMarket = new Market({
      id: 1,
      name: 'test',
      openHours: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
        {
          dayOfWeek: 'WEDNESDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
      ],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });

    expect(closedMarket.isOpen()).toBeFalsy();
    vitest.restoreAllMocks();
  });

  it('should compatible with MarketType (MarketType -> Market)', () => {
    const marketType: MarketType = {
      id: 1,
      name: 'test',
      openHours: [
        {
          dayOfWeek: 'MONDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
        {
          dayOfWeek: 'TUESDAY',
          openTime: '09:00',
          closeTime: '18:00',
        },
      ],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    };

    const market = new Market(marketType);

    expect(market).toBeInstanceOf(Market);
    expect(market.id).toBe(marketType.id);
    expect(market.name).toBe(marketType.name);
    expect(market.openHours).toEqual(marketType.openHours);
    expect(market.address).toBe(marketType.address);
    expect(market.products).toEqual(marketType.products);
    expect(market.imageUrls).toEqual(marketType.imageUrls);
    expect(market.summary).toBe(marketType.summary);
  });

  it('should compatible with MarketType (Market -> MarketType)', () => {
    const market = new Market({
      id: 1,
      name: 'test',
      openHours: [],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });

    const marketType: MarketType = market;

    expect(marketType).toEqual({
      id: 1,
      name: 'test',
      openHours: [],
      address: 'test',
      products: [],
      imageUrls: [],
      summary: 'test',
    });
  });
});
