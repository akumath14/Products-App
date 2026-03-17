import { useState } from "react";

const AddProduct = ({ onAdd }) => {
    console.log('add product component')
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!name.trim()) {
            setError('Name is required');
            return;
        }
        try {
            await onAdd(name);
            setName('');
        } catch (err) {
            setError(err.name || 'Error adding product');
        }
    }
    return(
        <form onSubmit={handleFormSubmit} className='form' aria-label='Add product form'>
            <label htmlFor='product-name'>Name</label>
            <input name='product-name' id='product-name' type='text' value={name} onChange={(e) => setName(e.target.value)} required aria-required='true' />
            <button type='submit'>Add Product</button>
            {error && (
                <div role="alert" className="error">
                    {error}
                </div>
            )}
        </form>
    )
}
export default AddProduct;