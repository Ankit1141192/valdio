const mongodb = require("mongodb");

const productSchema = {
  bsonType: "object",
  required: [
    "id",
    "name",
    "category",
    "price",
    "mrp",
    "discountRate",
    "rating",
    "image",
    "description"
  ],
  properties: {
    id: {
      bsonType: "string",
      description: "Unique product id"
    },

    name: {
      bsonType: "string",
      description: "Product name"
    },

    category: {
      bsonType: "string",
      description: "Product category"
    },

    price: {
      bsonType: "number",
      minimum: 0,
      description: "Selling price"
    },

    mrp: {
      bsonType: "number",
      minimum: 0,
      description: "Original price"
    },

    discountRate: {
      bsonType: "number",
      minimum: 0,
      maximum: 100,
      description: "Discount percentage"
    },

    rating: {
      bsonType: "number",
      minimum: 0,
      maximum: 5
    },

    reviews: {
      bsonType: ["int", "string"],
      description: "Number of reviews"
    },

    badge: {
      bsonType: "string"
    },

    image: {
      bsonType: "string",
      description: "Main product image"
    },

    description: {
      bsonType: "string"
    },

    links: {
      bsonType: "object",
      properties: {
        short: { bsonType: "string" },
        full: { bsonType: "string" }
      }
    },

    variants: {
      bsonType: "object",
      properties: {
        colors: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "image"],
            properties: {
              name: { bsonType: "string" },
              image: { bsonType: "string" },
              size: {
                bsonType: "array",
                items: { bsonType: "string" }
              }
            }
          }
        }
      }
    },

    features: {
      bsonType: "array",
      items: { bsonType: "string" }
    },

    createdAt: {
      bsonType: "date"
    }
  }
};

module.exports = productSchema;
