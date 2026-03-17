import { useEffect, useState } from 'react';
import { addProduct, getProducts } from '../../api';
import Item from "../Item/Item";
import AddProduct from '../AddProduct/AddProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('products', products)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (name) => {
    setError('');
    await addProduct(name);
    await fetchProducts();
  };

  return (
    <main className="container">
      <h1>Products</h1>

      {error && (
        <div role='alert' className='error'>
          {error}
        </div>
      )}

      <AddProduct onAdd={handleAddProduct} />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ul className='list'>
          {products.map((product) => (
            <Item key={product.id} item={product} />
          ))}
        </ul>
      )}
    </main>
    )
}
export default Products;