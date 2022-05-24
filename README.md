<h1 align="center">Hi <a target="_blank" rel="noopener noreferrer">
    <img src="https://raw.githubusercontent.com/ABSphreak/ABSphreak/master/gifs/Hi.gif" width="40px" />
  </a>, I'm Ayush Srivastav</h1>
  </br>
    
  # Large File Processor
  
  ## STEPS to RUN THE Code
  - Install Docker on your system, ignore if it is already installed
  - Clone the Project in any diretory on your local machine
  - Open terminal and go to the directory where project is cloned
  - Run below commands to build and run the project
      - `docker build -t large-file-processor .`
      - `docker run -it -p 8080:3000 -d large-file-processor`
---
## API END-POINTS

  Server runs on PORT: 8080
      - API Link: `localhost/8080`
### Following are the API Links for performing different task in Large File Prcessor system
1. Import `products.csv` file to into `products` collection of MongoDB
    - API Link: `localhot/8080/api/products/import`
    - METHOD: **GET**
  
2. Get all the products from the database
    - API Link: `localhot/8080/api/products/fetchdata`
    - METHOD: **GET**
  
3. Update a product by `sku` field as primary key
    - API Link: `localhot/8080/api/products/:sku/update`
    - METHOD: **PUT**
  
4. Aggregate products by `no. of products` based on rows with same `name`
    - API Link: `localhot/8080/api/products/aggregate`
    - METHOD: **GET**
    ```javascript
    {
    "success": "Products aggregated",
    "status": 200,
    "data": [
        {
            "_id": "Kevin Brennan",
            "total": 1
        },
        {
            "_id": "Angela Thompson",
            "total": 1
        },
        {
            "_id": "Sarah Edwards",
            "total": 1
        },
        .
        .
        .
        ]
    }
    ```
  
5. Get product by id
    - API Link: `localhot/8080/api/products/:id`
    - METHOD: **GET**
  

---

  
