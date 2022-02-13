export interface Product {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  href: string;
  name: string;
  slug: string;
  type_product: string;
  price: number;
  special_price: number;
  public_price: number;
  description: string;
  warehouse_id: any;
  first_order_special_price: boolean;
  store_id: number;
  discount_percentage: any;
  quantity_special_price: any;
  image_large_url: string;
  image_medium_url: string;
  special_price_expiration_date: string;
  special_price_starting_date: string;
  image_small_url: string;
  image_app_url: string;
  is_best_price: boolean;
  quantity: string;
  unit: string;
  has_warning: boolean;
  delivery_discount_start_date: any;
  delivery_discount_amount: number;
  is_marketplace: boolean;
  marketplace_delivery_days: any;
  pum: string[];
  volume: number;
  weight: number;
  status: boolean;
  sponsored: boolean;
  template_video: any;
  slugs: Slugs;
}

export interface Slugs {
  city: string;
  department: string;
  shelf: string;
  product: string;
}

export interface Relationships {
  storeProductCatalogTags: StoreProductCatalogTags;
  department: Department;
  shelf: Shelf;
}

export interface StoreProductCatalogTags {
  data: any[];
}

export interface Department {
  data: Data;
}

export interface Data {
  type: string;
  id: string;
}

export interface Shelf {
  data: Data2;
}

export interface Data2 {
  type: string;
  id: string;
}
