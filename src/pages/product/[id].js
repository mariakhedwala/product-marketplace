// pages/[id].js
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import productsData from '@/data/products.json'; // Example dummy data
import Image from 'next/image';

const ProductDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL

    // Find the product based on the ID
    const product = productsData.find((product) => product.id == id);

    if (!product) {
        return (
            <div className="text-center">
                <h2>Product not found</h2>
            </div>
        );
    }

    return (
        <Layout
            categories={[]} // You can pass an empty array if no categories are needed
            onCategoryChange={() => { }} // No category change handler needed here
            onSearchChange={() => { }} // No search change handler needed here
            selectedCategory={product.category} // Optionally pass the category of the current product
        >
            <div className="text-custom-white max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                {/* Product Name */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

                {/* Image and Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image */}
                    <div>
                        <Image
                            className="w-full h-80 object-cover rounded-lg"
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={150}
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-semibold text-gray-800">Category:</span>{' '}
                            {product.category}
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-semibold text-gray-800">Subcategory:</span>{' '}
                            {product.subCategory}
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-semibold text-gray-800">Creator:</span>{' '}
                            {product.creator}
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                            <span className="font-semibold text-gray-800">Price:</span> ${product.price.toFixed(2)}
                        </p>
                        <p className="text-lg text-gray-600 mb-2 flex">
                            <span className="font-semibold text-gray-800 mr-1">Rating:</span>{' '}
                            <span className="flex items-center bg-black rounded w-fit p-1">
                                {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                                    <Image
                                        key={index}
                                        src="/rating-star.png"
                                        alt="Product rating"
                                        width={5}
                                        height={5}
                                    />
                                ))}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Additional Actions */}
                <div className="mt-6">
                    <button className="px-6 py-3 bg-gray-600 text-custom-white font-medium rounded-lg hover:bg-gray-700 transition duration-300">
                        Buy Now
                    </button>
                    <button className="ml-4 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition duration-300">
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailsPage;
