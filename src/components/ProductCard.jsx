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
        <img src={product.name} alt="https://th.bing.com/th/id/OIP.z9f1l0WKMQw9em8cXGO_zQHaH6?w=166&h=180&c=7&r=0&o=5&pid=1.7" className='cardImage' />
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