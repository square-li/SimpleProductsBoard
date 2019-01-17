import {RawData} from './interfaces';

export class Product {
  name: string;
  price: number; // In minimal unit of money (Cents)
  rating: 1 | 2 | 3 | 4 | 5;
  reviewCount: number;
  description: string;
  image: string;

  constructor(data: RawData) {
    this.name = data.name;
    if (data.rating >= 1 && data.rating <= 5 && data.rating % 1 === 0) {
      this.rating = <1 | 2 | 3 | 4 | 5>data.rating;
    } else {
      throw Error('Invalid rating');
    }
    try {
      // Remove '.' and '$'
      this.price = parseInt(data.price.replace(/[\.\$]/g, ''), 10);
    } catch (e) {
      throw Error('Invalid price');
    }
    this.reviewCount = data.review_count;
    this.description = data.description;
    this.image = data.image;
  }

}
