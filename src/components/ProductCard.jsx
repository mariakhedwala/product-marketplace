import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    const roundedRating = Math.floor(product.rating);
    return (
        <li className=" text-custom-white rounded mb-5">
            <Link href={`/product/${product.id}`}>
                <div className="bg-gray-600 rounded mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                </div>
                <h3 className="text-lg font-bold product-name">{product.name}</h3>
                <p className="text-sm text-gray-400 product-creator">Creator: {product.creator}</p>

                {/* Product Rating */}
                <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                        {Array.from({ length: roundedRating }, (_, index) => (
                            <Image
                                key={index}
                                src="/rating-star.png"
                                alt="Product Marketplace Rating"
                                width={14}
                                height={14}
                            />
                        ))}
                    </div>
                    <span className='ml-2'>{product.rating}</span>
                </div>

                <p className="font-bold product-price">${product.price}</p>
            </Link>
        </li>
    );
};

export default ProductCard;
