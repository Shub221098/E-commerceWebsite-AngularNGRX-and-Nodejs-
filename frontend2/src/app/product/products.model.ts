export class Products {
  public id: string;
  public name: string;
  public description: string;
  public category: string;
  public brand: string;
  public mainImage: string;
  public price: number;
  public discountPrice: number;
  public rating: number;
  public stock: number;
  public totalStock: number;
  public ratingsAverage: number;
  public inStock: boolean;
  public active: boolean;
  public createdAt : Date;
  public quantity: number

  constructor(
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    mainImage: string,
    price: number,
    discountPrice: number,
    rating: number,
    stock: number,
    totalStock: number,
    ratingsAverage: number,
    inStock: boolean,
    active: boolean,
    createdAt : Date,
    quantity: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.mainImage = mainImage;
    this.price = price;
    this.discountPrice = discountPrice;
    this.rating = rating;
    this.stock = stock;
    this.totalStock = totalStock;
    this.ratingsAverage = ratingsAverage;
    this.inStock = inStock;
    this.active = active;
    this.createdAt = createdAt
    this.quantity = quantity
  }
}
