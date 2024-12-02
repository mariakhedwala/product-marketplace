import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ filteredProducts, selectedCategory }) => {
    return (
        <div>
            <main className="p-8">
                <h4 className='mb-3'>{selectedCategory !== 'all-categories' ? selectedCategory : 'All Categories'}</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default ProductList;
