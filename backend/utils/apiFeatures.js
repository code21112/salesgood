class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = { ...this.queryString }

        // Removing fields from the query string
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(element => delete queryStrCopy[element]);

        // Advanced filtering from price, ratings, 
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    paginate(resultsPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;


// HIS code

// class APIFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search() {
//         const keyword = this.queryStr.keyword ? {
//             name: {
//                 $regex: this.queryStr.keyword,
//                 $options: 'i'
//             }
//         } : {}

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filter() {

//         const queryCopy = { ...this.queryStr };

//         // Removing fields from the query
//         const removeFields = ['keyword', 'limit', 'page']
//         removeFields.forEach(el => delete queryCopy[el]);

//         // Advance filter for price, ratings etc
//         let queryStr = JSON.stringify(queryCopy)
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


//         this.query = this.query.find(JSON.parse(queryStr));
//         return this;
//     }

//     paginate(resPerPage) {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resPerPage * (currentPage - 1);

//         this.query = this.query.limit(resPerPage).skip(skip);
//         return this;
//     }
// }

// module.exports = APIFeatures