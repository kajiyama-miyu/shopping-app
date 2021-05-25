import { Items, Toppings } from "../products/type";

export interface User {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  telephone: string;
  password: string;
  confirmPassword: string;
}

export interface UserInfo {
  id?: number;
  name: string;
  email: string;
  zipcode: string;
  address: string;
  telephone: string;
  password?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface OrderItem {
  item: number;
  size: string;
  quantity: number;
  order_toppings: Array<OrderTopping>;
}

export type OrderTopping = {
  topping: number;
};

export interface AddCart {
  order_item: OrderItem;
  status: number;
}

export interface Order {
  id: number | null;
  order_items: Array<OrderItems>;
  user: UserInfo;
  status: number;
  total_price: number;
  order_date: Date | null;
  destination_name: string | null;
  destination_email: string | null;
  destination_zipcode: string | null;
  destination_address: string | null;
  destination_tel: string | null;
  delivery_time: Date | null;
  payment_method: number | null;
}

export interface OrderItems {
  id: number;
  item_id: Items;
  order_toppings: Array<{
    id: number;
    topping: Toppings;
    order_item: number;
  }>;
  quantity: number;
  size: string;
  order_id: number;
}
