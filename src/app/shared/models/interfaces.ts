export interface RawDataSet {
  products: RawData[];
}

export interface RawData {
  image: string;
  name: string;
  price: string;
  rating: number;
  review_count: number;
  description: string;
}
