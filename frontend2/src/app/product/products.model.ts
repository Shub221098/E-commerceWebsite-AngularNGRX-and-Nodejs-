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
  public ratingAverage: number;
  public inStock: boolean;
  public active: boolean;

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
    ratingAverage: number,
    inStock: boolean,
    active: boolean
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
    this.ratingAverage = ratingAverage;
    this.inStock = inStock;
    this.active = active;
  }
}
