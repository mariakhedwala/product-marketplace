import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CategoryModal from './CategoryModals';
import FilterModal from './FilterModal';
import Link from 'next/link';

const Header = ({ categories, onCategoryChange, onSearchChange, selectedCategory, handleApplyFilters, setFilteredProducts }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCategory, setShowCategory] = useState("All");
    const [isFocused, setIsFocused] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isExpandedSearch, setIsExpandedSearch] = useState(false);

    useEffect(() => {
        displayCategory();
        // eslint-disable-next-line 
    }, [selectedCategory])

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearchChange(query);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const displayCategory = () => {
        const displayName = selectedCategory.includes('All in') ? selectedCategory.split('in ')[1] : selectedCategory.split(' > ')[1];
        setShowCategory(displayName ? displayName : "All");
    }

    return (
        <header className="bg-black text-custom-white p-4 shadow-md">
            <div className="wrapper flex items-center justify-between">
                <h1 className="text-2xl font-bold text-red-500">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Product Marketplace Logo"
                            width={170}
                            height={32}
                            className="rounded-full"
                        />
                    </Link>
                </h1>
                <div className={`flex space-x-4 header-search-cat justify-end md:justify-start`}>
                    {/* Search Icon - Visible on Mobile */}
                    <div
                        onClick={() => setIsExpandedSearch(!isExpandedSearch)}
                        className="search-icon flex md:hidden justify-center items-center cursor-pointer"
                    >
                        <Image
                            src="/search.png" // Optional: Use a different icon for mobile
                            alt="Mobile Search"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>

                    <div className={`${isExpandedSearch ? "absolute top-[84px] left-0 " : "md:relative hidden md:flex "} header-search-cat-inner flex`}>
                        <label
                            htmlFor="search"
                            className="flex flex-col justify-end w-1/2 relative cursor-pointer pl-[30px] group"
                        >
                            {/* The label "Keyword" */}
                            <span
                                className={`label-text absolute left-2 top-2 transition-all duration-200 ease-in-out ${isFocused || searchQuery ? 'opacity-0' : 'opacity-100'}`}
                            >
                                Keyword
                            </span>

                            {/* The input field */}
                            <input
                                id="search"
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInput}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={`bg-transparent rounded-md focus:outline-none ${isFocused || searchQuery ? 'py-2' : 'p-0'}`}
                            />
                        </label>


                        {!isFocused && (<span className='v-bar'></span>)}
                        <div onClick={toggleModal} className="w-1/2 cursor-pointer flex flex-col justify-evenly pl-3">
                            <span className='label-text'>Category</span>
                            <p className='leading-none'>{showCategory}</p>
                        </div>
                        <div className="search-icon flex justify-center items-center">
                            <Image
                                src="/search.png"
                                alt="Product Marketplace Search"
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                            />
                        </div>
                    </div>
                    <div
                        onClick={() => setIsFilterModalOpen(true)}
                        className="filter-menu rounded-full cursor-pointer flex justify-center items-center">
                        <Image
                            src="/filter-menu.png"
                            alt="Product Marketplace Filter"
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
                {/* Additional Header Elements */}
                <ul className="flex items-center space-x-4">
                    <li className='hidden md:block'><a href='#' className="">List your creation</a></li>
                    <li className='globe'>
                        <a href="#">
                            <Image
                                src="/globe-alt.png"
                                alt="Product Marketplace Globe"
                                width={40}
                                height={40}
                            />
                        </a>
                    </li>
                    <li className='flex p-1 menu-account items-center justify-between'>
                        <a href="#" className='menu p-2 box-content'>
                            <Image
                                src="/menu.png"
                                alt="Product Marketplace Menu"
                                width={40}
                                height={40}
                            />
                        </a>
                        <a href="#" className='account p-2 box-content'>
                            <Image
                                src="/account.png"
                                alt="Product Marketplace Account"
                                width={40}
                                height={40}
                            />
                        </a>
                    </li>
                    <li className='cart'>
                        <a href="#">
                            <Image
                                src="/cart.png"
                                alt="Product Marketplace Cart"
                                width={40}
                                height={40}
                            />
                        </a>
                    </li>

                </ul>
                {isModalOpen && (
                    <CategoryModal
                        categories={categories}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCategoryChange={onCategoryChange}
                        selectedCategory={selectedCategory}
                    />
                )}
                <FilterModal
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    onApply={handleApplyFilters}
                    onClear={setFilteredProducts}
                />
            </div>
        </header>
    );
};

export default Header;
