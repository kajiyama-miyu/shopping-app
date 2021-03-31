import dayjs from "dayjs";

export interface Items {
  id: number;
  name: string;
  description?: string;
  price_m: number;
  price_l: number;
  image_path?: string;
  deleted?: boolean;
}

export interface Toppings {
  id: number;
  name: string;
  price_m: number;
  price_l: number;
}

export interface Products {
  items: Array<Items>;
  toppings: Array<Toppings>;
}

export interface OrderProducts {
  status: number;
  total_price: number;
  order_date: string;
  destination_name: string;
  destination_email: string;
  destination_zipcode: string;
  destination_address: string;
  destination_tel: string;
  delivery_time: string;
  payment_method: number;
}
