import { Markets } from "./types";

export const tickSizesByMarket = {
  [Markets.PI_XBTUSD]: [0.5],
  [Markets.PI_ETHUSD]: [0.05],
};

export const defaultMarket = Markets.PI_XBTUSD;

export const API_URL = "wss://www.cryptofacilities.com/ws/v1";
