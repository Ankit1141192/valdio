const { MongoClient } = require("mongodb");
const productSchema = require("./product.schema");

async function createProductsCollection() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();

  const db = client.db("ecommerce");

  await db.createCollection("products", {
    validator: {
      $jsonSchema: productSchema
    }
  });

  console.log("Products collection created with schema validation");
  await client.close();
}

createProductsCollection();
