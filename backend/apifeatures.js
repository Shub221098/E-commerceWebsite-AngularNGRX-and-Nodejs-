class APIFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }

  // filter() {
  //   // Build Query
  //   //1A - Filtering
  //   const queryObj = { ...this.queryString };
  //   console.log(queryObj)
  //   const excludedFields = ["page", "sort", "limit", "fields"];
  //   excludedFields.forEach((el) => delete queryObj[el]);

  //   //1B - Advanced Filtering
  //   let queryStr = JSON.stringify(queryObj);
  //   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  //   const product = this.query.find(JSON.parse(queryStr));
  //   console.log(product);
  //   // let query = Tour.find(JSON.parse(queryStr));
  //   return this;
  // }
  filter() {
    // Build Query
    //1A - Filtering
    const queryObj = { ...this.queryString };
    console.log(queryObj);
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
  
    //1B - Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const product = this.query.find(JSON.parse(queryStr));
    console.log(product);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",");
      const sortObject = {};
      sortObject[sortBy[0]] = +sortBy[1];
      this.query = this.query.sort(sortObject);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    //Feild Limiting
    if (this.queryString.feild) {
      const feild = this.queryString.feilds.split(",").join(" ");
      this.query = this.query.select(feild);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    //Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    console.log(page, limit);
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
 
}

module.exports = APIFeatures;
