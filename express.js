const express = require("express")
const { randomUUID } = require("crypto")
const fs = require("fs")

const app = express()

app.use(express.json())

let products = []

fs.readFile("products.json", "utf-8", function(err, data) {
  if (err) {
    console.error(err)
  } else {
    products = JSON.parse(data)
  }
})

// POST SINGLE PRODUCT
app.post("/products", (request, response) => {

  const { name, price } = request.body

  const product = {
    id: randomUUID(),
    name,
    price
  }

  products.push(product)

  productsFile()

  return response.json(product)

})


// GET ALL PRODUCTS
app.get("/products", (request, response) => {

  return response.json(products)

})


// GET SINGLE PRODUCT
app.get("/products/:id", (request, response) => {
  
  const { id } = request.params
  const product = products.find(product => product.id === id)

  return response.json(product)

})


// PUT
app.put("/products/:id", (request, response) => {
  
  const { id } = request.params
  const { name, price } = request.body

  const productIndex = products.findIndex(product => product.id === id)

  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  productsFile()

  return response.json('Product update successfully')

})


// DELETE
app.delete("/products/:id", (request, response) => {
  
  const { id } = request.params

  const productIndex = products.findIndex(product => product.id === id)

  products.splice(productIndex, 1)

  productsFile()

  return response.json('Product removed successfully')

})

function productsFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    console.log(err ? err : 'Product inserted successfully')
  })
}

app.listen(4002, () => console.log('Server running at port 4002'))