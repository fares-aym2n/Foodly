class featursAPI {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // 1)Filtering
  filter() {
    const queryObj = { ...this.queryStr };

    const execludeField = ['sort', 'page', 'limit', 'fields'];

    execludeField.forEach((el) => delete queryObj[el]);

    if (this.queryStr.address) {
      const address = this.queryStr.address;

      queryObj.address = {
        $regex: `${address}`,
        $options: 'i',
      };
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // 4)Filtering Fields
  limit() {
    if (this.queryStr.fields) {
      const limitedField = this.queryStr.fields
        .split(',')
        .join(' ');
      this.query = this.query.select(limitedField);
    } else {
      this.query = this.query.select(
        '-createdAt -updatedAt -__v',
      );
    }
    return this;
  }

  // 3)Sorting{
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort;
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  paginate() {
    // 5)Pagination
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}
module.exports = featursAPI;
