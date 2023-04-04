# E-commerce Fullstack Final Project

Welcome to Archi-Tech! Our e-commerce website features a variety of popular tech!

## Features

#### User Registration/Login/Logout functionality:

- User Registers with important information needed for purchase

- User's password will be protected using hashing with salt

- When logging in, the user will be given a token, giving them access to the site for 1 hour

- They will be able to see all of our exclusive products

- They can add products to cart or add to wishlist/favorites

- They can also view their order history

### Front-End Functionality:

#### Nav-bar:

- Dashboard

- Sign In / Out

- Products

- User Account

- wishlist

#### Products Page:

- Displays the list of products

  - Ability to be redirected to the products' Page

  - Each item will have the following fields:

    - Image

    - Title

    - Price (regular or sale price)

    - Category

    - Model number

    - SKU

    - Number of reviews (and stars)

    - Add to cart

    - Add to wishlist/favorites

- The ability to sort through the products, filter by category, or search for a specific product

#### Cart Page:

- User will see all of their products that they added to cart

- Will be able to either change the quantity or remove products

- Can add cart items to wishlist

- Cart items will display:

  - Name

  - quantity

  - Price

  - Remove from cart button

- Will see the total amount of all products

- Will be able to remove all products from their cart

#### User Account page:

- Can see all of their information, including their order history

- Can update their information, or delete their Account

- Can show their wishlist

### Back-End Functionality:

#### GET ROUTES

- GET all products

- GET wishlist

- GET cart

- GET order history

#### POST ROUTES

- POST new user

- POST new product

-POST add to cart

#### PUT ROUTES

- PUT update user account details

- PUT update product details

- PUT update cart details

#### DELETE ROUTES

- DELETE user

- DELETE Products

- DELETE all products

- DELETE all users
