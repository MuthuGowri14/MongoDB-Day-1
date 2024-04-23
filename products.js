//database name - task
//collection name- product

//1. find all the information about each products

db.product.find().toArray()

//2. find the product price which are between 400 to 800

db.product.find({product_price:{$gt:400,$lt:800}})

//3. find the product price which are not between 400 to 600

db.product.find({product_price:{$not:{$gt:400,$lt:800}}}).toArray()

//4. list the four product which are greater than 500 in price

db.product.find({product_price:{$gt:500}})

//5. find the product name and product material of each products

db.product.find().forEach(function(value){
    print("Product Name : ",value.product_name)
    print("Product Materail : ", value.product_material)
})

//6. Find the product with a row id of 10

db.product.find({id:"10"})

//7. Find only the product name and product material

//same answer like 5th question if this question is to find the 
//productname and product material only for id:10,here it is
db.product.find({id:"10"}).forEach(function(value){
    print("Product Name : ",value.product_name)
    print("Product Materail : ",value.product_material)
})

//8. find all products which contain the value of soft in product material

db.product.find({product_material:"Soft"}).forEach(function(value){
    print("Product Name : ",value.product_name)
})

//9. find products which contain product color indigo and product price 492

db.product.find({$or:[{product_color:"indigo"},{product_price:492}]})

//10. delete the products which product price value are same

db.product.aggregate([
    {
        $group:{
            _id:"$product_price",
            duplicate:{$addToSet:"$_id"},
            TotalCount:{$sum:1},
        },
    },
    {
        $match:{TotalCount:{$gt:1}}
    }
]).forEach((value)=>{
    db.product.deleteMany({_id:{
        $in:value.duplicate
    }})
})