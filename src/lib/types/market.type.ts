import {ProductType} from './product.type';

export type MarketType = {
  id: number;
  name: string;
  /** 픽업 시작 시간 (ISO 8601) */
  pickupStartAt: string;
  /** 픽업 종료 시간 (ISO 8601) */
  pickupEndAt: string;
  /** 영업 시작 시간 (ISO 8601) */
  openAt: string;
  /** 영업 종료 시간 (ISO 8601) */
  closeAt: string;
  /** 주소 */
  address: string;
  /** 구체적인 주소 */
  specificAddress: string;
  products: ProductType[];
  /** 위도 */
  latitude: number;
  /** 경도 */
  longitude: number;
  images: string[];
};
