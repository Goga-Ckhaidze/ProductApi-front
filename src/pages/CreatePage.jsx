import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import Alert from '../alert/Alert'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const [alert, setAlert] = useState(null);

  const {createProduct} = useProductStore()

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const {success, message} = await createProduct(newProduct)
    console.log("Success:", success)
    console.log("Message:", message)

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setAlert({ message: 'Please fill all fields!', type: 'error' });
  }
   else {
      setAlert({ message: 'Product created successfully!', type: 'success' });
  }

    setTimeout(() => {
      setAlert(null);
  }, 3000);
  }

  return (
    <>
    <div className='createProduct'>
    <h1>Create new Product</h1>

    {alert && <Alert message={alert.message} type={alert.type} />} 

    <div className='form'>
    <form onSubmit={handleAddProduct}>
      <input
      className='createInput'
      type="text"
      placeholder='Product Name'
      name='name'
      value={newProduct.name}
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>

     <input
     className='createInput'
      type="number"
      placeholder='Product Price'
      name='price'
      value={newProduct.price}
      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>

      <input
      className='createInput'
      placeholder='Product image URL'
      name='image'
      value={newProduct.image}
      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}/>

      <button type='submit' className='addButton'>Add</button>

    </form>

    </div>
    </div>
    </>
  )
}

export default CreatePage