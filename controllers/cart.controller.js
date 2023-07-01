import Cart from '../models/cart.model.js'

export const getCart = async (req, res) => {
   // Retrieve all cart items
   try {
      const cartItems = await Cart.find()
      res.status(200).json(cartItems)
   } catch (error) {
      console.error('Error retrieving cart items:', error)
      res.status(500).json({ error: 'Error retrieving cart items' })
   }
}

export const createCart = async (req, res) => {
   // Create new cart item instance
   const newCartItem = new Cart({
      name: 'Product Name',
      price: 9.99,
      quantity: 2,
      images: [
         'https://res.cloudinary.com/khobbylynx/image/upload/v1683975735/lynxmart/img/products/watch/rolex_eca_sviuo1.jpg',
         'https://res.cloudinary.com/khobbylynx/image/upload/v1683975727/lynxmart/img/products/watch/rolex_a_dkespo.jpg',
         'https://res.cloudinary.com/khobbylynx/image/upload/v1683975741/lynxmart/img/products/watch/rolex__rwrvoi.jpg',
         'https://res.cloudinary.com/khobbylynx/image/upload/v1683975736/lynxmart/img/products/watch/rolex_ec_vx8icn.jpg',
      ],
   })

   // Save the new cart item to the database
   try {
      const savedCartItem = await newCartItem.save()
      console.log('Cart item saved successfully:', savedCartItem)
      res.status(201).send(newCartItem)
   } catch (error) {
      console.error('Error saving cart item:', error)
   }
}
