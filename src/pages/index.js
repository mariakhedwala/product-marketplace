import React, { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import productsData from '@/data/products.json';
import Layout from '@/components/Layout';

const HomePage = () => {
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const authenticate = () => {
        const password = "fedev2024test";
        const userInput = prompt("Enter the password to access the site:");
        if (userInput !== password) {
            alert("Incorrect password. Access denied.");
            window.location.href = "https://github.com";
        }
    }

    useEffect(() => {
        authenticate();
    }, [])

    const categories = productsData.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = new Set();
            acc[product.category].add(`All in ${product.category}`);
        }
        if (product.subCategory) {
            acc[product.category].add(product.subCategory);
        }
        return acc;
    }, {});

    const updateFilteredProducts = (search = "", category = "") => {
        const query = search.toLowerCase();

        const filtered = productsData.filter((product) => {
            const matchesSearch =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.creator.toLowerCase().includes(query);

            if (category === 'all-categories') {
                return product;
            } else if (category.includes('All in')) {
                const cat = category.split('in ')[1];
                setSelectedCategory(`All in ${cat}`)
                return product.category === cat;
            }
            const matchesCategory =
                (category.includes('>')
                    ? (() => {
                        const [mainCategory, subCategory] = category.split(' > ');
                        return (
                            product.category === mainCategory &&
                            product.subCategory === subCategory
                        );
                    })()
                    : product.category === category);

            return matchesCategory && matchesSearch;
        });

        setFilteredProducts(filtered);
    };

    const handleApplyFilters = (filters) => {
        const { minPrice, maxPrice, selectedPlatforms } = filters;
        setFilteredProducts(
            productsData.filter((product) => {
                const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
                const matchesPlatform =
                    selectedPlatforms.length === 0 ||
                    selectedPlatforms.includes(product.platform);
                return matchesPrice && matchesPlatform;
            })
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        updateFilteredProducts(searchQuery, category);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        const filtered = productsData.filter((product) => {
            return !query ||
                product.name.toLowerCase().includes(query) ||
                product.creator.toLowerCase().includes(query);
        })
        setFilteredProducts(filtered)
    };

    return (
        <div className="bg-black text-custom-white min-h-screen">
            <Layout
                categories={categories}
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                handleApplyFilters={handleApplyFilters}
                setFilteredProducts={() => setFilteredProducts(productsData)}
            >
                <ProductList filteredProducts={filteredProducts} selectedCategory={selectedCategory} />
            </Layout>
        </div>
    );
};

export default HomePage;
