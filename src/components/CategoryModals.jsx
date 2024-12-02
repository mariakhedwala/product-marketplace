import React, { useState } from 'react';
import Image from 'next/image';

const CategoryModal = ({
    categories,
    isOpen,
    onClose,
    onCategoryChange,
    selectedCategory
}) => {
    const [expandedCategory, setExpandedCategory] = useState(""); // Track expanded category

    const toggleCategory = (category) => {
        setExpandedCategory((prev) => (prev === category ? "" : category));
    };

    const isActive = (category) => {
        let cat = selectedCategory;
        if (selectedCategory.includes('>')) {
            cat = selectedCategory.split(" > ")[1];
        }
        if (selectedCategory === "All Categories" && category === "All Categories") return true;
        if (cat === category) return true;
        if (cat.startsWith("All in") && category === selectedCategory) return true;
        return false;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-start z-50 bg-opacity-30 bg-black" onClick={onClose}>
            <div className='category-wrap min-h-[352px] flex p-6 mt-[84px] rounded-lg w-3/4 max-w-md' onClick={(e) => e.stopPropagation()}>
                <ul className='w-1/2 category'>
                    {Object.keys(categories).map((category) => (
                        <li key={category} className="mb-2">
                            <button
                                className={`flex justify-between items-center text-left w-full py-2 px-4 rounded font-bold ${expandedCategory === category
                                    ? "bg-[#655D5E] "
                                    : "transparent"
                                    }`}
                                onClick={() => toggleCategory(category)}
                            >
                                <span>{category}</span>
                                <Image
                                    src="/cheveron-right.png"
                                    alt="right arrow"
                                    width={16}
                                    height={16}
                                    className="rounded-full"
                                />
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className={`block text-left w-full py-2 px-4 rounded
                        ${isActive("all-categories") ? "bg-[#655D5E] " : "hover:bg-[#655D5E]"}`}
                            onClick={() => {
                                onCategoryChange("all-categories"), setExpandedCategory("");
                            }}
                        >
                            All Categories
                        </button>
                    </li>
                </ul>
                {expandedCategory && (<ul className='left-border ml-2 w-1/2'>
                    {Object.keys(categories).map((category) => (
                        <li key={category}>
                            {/* Subcategory Accordion */}
                            {expandedCategory === category && (
                                <div className="space-y-2 ml-2">
                                    {[...categories[category]].map((subCategory) => (
                                        <button
                                            key={subCategory}
                                            className={`w-full text-left px-4 py-2 rounded ${isActive(`${subCategory}`) ? "bg-[#655D5E]" : "hover:bg-[#655D5E]"
                                                }`}
                                            onClick={() =>
                                                onCategoryChange(
                                                    `${category} > ${subCategory}`
                                                )
                                            }
                                        >
                                            {subCategory}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>)}
            </div>
        </div>
    );
};

export default CategoryModal;
