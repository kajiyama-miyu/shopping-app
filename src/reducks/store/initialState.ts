import { Loading } from "../loading/type";
import { UserInfo, Order } from "../user/type";
import { Products } from "../products/type";

export const initialLoadingState: Loading = {
  state: false,
  text: "",
};

export const products: Products = {
  items: [],
  toppings: [],
};

export const userInfo: UserInfo = {
  id: 0,
  name: "",
  email: "",
  zipcode: "",
  address: "",
  telephone: "",
  password: "",
};

export const user: Order = {
  user: {
    id: 0,
    name: "",
    email: "",
    zipcode: "",
    address: "",
    telephone: "",
    password: "",
  },
  id: null,
  order_items: [
    {
      id: 0,
      item_id: {
        id: 0,
        name: "",
        description: "",
        price_m: 0,
        price_l: 0,
        image_path: "",
        deleted: false,
      },
      order_toppings: [
        {
          id: 0,
          topping: {
            id: 0,
            name: "",
            price_m: 0,
            price_l: 0,
          },
          order_item: 0,
        },
      ],
      quantity: 0,
      size: "",
      order_id: 0,
    },
  ],
  status: 0,
  total_price: 0,
  order_date: null,
  destination_name: null,
  destination_email: null,
  destination_zipcode: null,
  destination_address: null,
  destination_tel: null,
  delivery_time: null,
  payment_method: null,
};

export const history: Array<Order> = [
  {
    user: {
      id: 0,
      name: "",
      email: "",
      zipcode: "",
      address: "",
      telephone: "",
      password: "",
    },
    id: 0,
    order_items: [
      {
        id: 0,
        item_id: {
          id: 0,
          name: "",
          description: "",
          price_m: 0,
          price_l: 0,
          image_path: "",
          deleted: false,
        },
        order_toppings: [
          {
            id: 0,
            topping: {
              id: 0,
              name: "",
              price_m: 0,
              price_l: 0,
            },
            order_item: 0,
          },
        ],
        quantity: 0,
        size: "",
        order_id: 0,
      },
    ],
    status: 0,
    total_price: 0,
    order_date: null,
    destination_name: null,
    destination_email: null,
    destination_zipcode: null,
    destination_address: null,
    destination_tel: null,
    delivery_time: null,
    payment_method: null,
  },
];
