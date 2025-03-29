import React, { use, useEffect, useState } from 'react'
import { useProductStore } from '../store/product'
import Alert from '../alert/Alert'
import { Link, useParams } from 'react-router-dom';
const  VITE_API_URL = import.meta.env.VITE_API_URL;

function ProductEdit({ product }) {

    const { id } = useParams()
    const { updateProduct } = useProductStore();



    const [updatedProduct, setUpdatedProduct] = useState({
        name: product?.name || '',
        price: product?.price || '',
        image: product?.image || ''
      });

        const [alert, setAlert] = useState(null);

        const handleEditProduct = async (e) => {
            e.preventDefault();


            if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
              setAlert({ message: 'Please fill all fields!', type: 'error' });
              return;
            }
            const { success, message } = await updateProduct(id, updatedProduct);
            console.log("Success:", success)
            console.log("Message:", message)
          if (!success) {
            setAlert({ message: 'Failed to update product.', type: 'error' });
          } else {
              setAlert({ message: 'Product updated successfully!', type: 'success' });
          }
        
            setTimeout(() => {
              setAlert(null);
          }, 3000);
          }
        
    useEffect(() => {
      const findUser = async () => {
          const response = await fetch(`${VITE_API_URL}/api/product/find?id=${id}`);
          const data = await response.json();
          setUpdatedProduct({
            name: data.name,
            price: data.price,
            image: data.image
          })
      };
      findUser();
  }, [id]);
  
  return (
    <>
    <div className='createProduct'>
    <h1>Edit Product</h1>

    {alert && <Alert message={alert.message} type={alert.type} />} 

    <div className='form'>
    <form onSubmit={handleEditProduct}>
      <input
      className='createInput'
      type="text"
      placeholder='Product Name'
      name='name'
      value={updatedProduct.name}
      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}/>

     <input
     className='createInput'
      type="number"
      placeholder='Product Price'
      name='price'
      value={updatedProduct.price}
      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}/>

      <input
      className='createInput'
      placeholder='Product image URL'
      name='image'
      value={updatedProduct.image}
      onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}/>

<button type='submit' className='addButton'>Update</button>
    </form>

    </div>
    </div>
    </>
  )
}

export default ProductEdit