import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import { Link } from 'react-router-dom'
import Alert from '../alert/Alert'

const ProductCard = ({product}) => {

    const { deleteProduct} = useProductStore()

      const [alert, setAlert] = useState(null);

    const handleDeleteProduct = async (id) => {
        const {success, message} = await deleteProduct(id)
        if(!success) {
            setAlert({ message: "Error Couldn't Delete", type: 'error' });
        }
        else {
            setAlert({ message: 'Card Deleted successfully!', type: 'success' });
        }

        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }

  return (
    <>

{alert && <Alert message={alert.message} type={alert.type} />}

    <div className='card'>
        <div className='Product'>
        <div className='imageDiv'>
        <img src={product.image} alt={`Image of ${product.name}`} className='cardImage'/>
        </div>

        <div className='Description'>
            <p className='productName cardText'>{product.name}</p>
            <p className='productPrice cardText'>{product.price}</p>

            <Link to={`/edit/${product._id}`} className='link'>
                <button className='redact'>✏️</button>
            </Link>
            <button className='delete' onClick={() => handleDeleteProduct(product._id)}>🗑️</button>
        </div>
</div>
    </div>
    </>
  )
}

export default ProductCard