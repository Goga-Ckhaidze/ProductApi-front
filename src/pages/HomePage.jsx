import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard';


const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])


  return (
    <>
    <h1 className='title'>Current Products 🚀</h1>
    
    <div className="cardsContainer">
    <div className='cardFlex'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        </div>
      </div>

      {products.length === 0 && (
      <p className='noProducts'>No products found 😢
      <Link to={'/create'} className='link'>
      <span className='createProduct'>Create a product</span>
      </Link></p>
      )}
    
    </>
  )
}

export default HomePage