import Image from "next/image";
import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApply, onClear }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000); // Example max price
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const platforms = [
        "VRChat (Quest)",
        "VRChat (PCVR)",
        "Spatial",
        "ChilloutVR",
        "Resonite",
        "Neos VR",
        "Cluster",
        "Virtual Cast",
        "Others",
    ];

    const handlePlatformToggle = (platform) => {
        setSelectedPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    // Handle the minimum price slider
    const handleMinPriceChange = (value) => {
        const clampedValue = Math.min(value, maxPrice - 1); // Prevent overlap
        setMinPrice(clampedValue);
    };

    // Handle the maximum price slider
    const handleMaxPriceChange = (value) => {
        const clampedValue = Math.max(value, minPrice + 1); // Prevent overlap
        setMaxPrice(clampedValue);
    };

    const handleApply = () => {
        onApply({ minPrice, maxPrice, selectedPlatforms });
        onClose();
    };

    const handleClear = () => {
        setMinPrice(0);
        setMaxPrice(1000);
        setSelectedPlatforms([]);
        onClear();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start z-50">
            <div className="filter-modal-wrap rounded-md  w-3/4 max-w-md mt-[84px]">
                <div className="p-6 flex justify-between items-center mb-4">
                    <button onClick={onClose} className="text-xl">
                        ×
                    </button>
                    <h2 className="text-lg font-bold text-center w-full">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-4 px-6">
                    <h3 className="mb-2">Price Range</h3>
                    <div className="relative h-8 flex items-center">
                        {/* Track */}
                        <div className="absolute w-full h-1 bg-gray-600 rounded-full"></div>
                        {/* Active Range */}
                        <div
                            className="absolute h-1 bg-red-500 rounded-full"
                            style={{
                                left: `${(minPrice / 1000) * 100}%`,
                                right: `${100 - (maxPrice / 1000) * 100}%`,
                            }}
                        ></div>
                        {/* Minimum Handle */}
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={minPrice}
                            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10"
                            style={{ accentColor: "#FF0000" }} // Red slider handle
                        />
                        {/* Maximum Handle */}
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-20"
                            style={{ accentColor: "#FF0000" }} // Red slider handle
                        />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                        <p className="flex flex-col items-center">
                            <span className="text-sm">Minimum</span>
                            <span className="border-[1px] border-[#515151] rounded-[30px] p-3">${minPrice.toFixed(2)}</span>
                        </p>
                        <p className="flex flex-col items-center">
                            <span className="text-sm">Maximum</span>
                            <span className="border-[1px] border-[#515151] rounded-[30px] p-3">${maxPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </div>

                {/* Platforms */}
                <div className="mb-4 px-6">
                    <h3 className="mb-2 border-t-[1px] border-t-[#5C5C5C] pt-6 mt-6">Platforms</h3>
                    <ul className="grid grid-cols-3 gap-2 max-w-[400px]">
                        {platforms.map((platform) => (
                            <li
                                className={`max-w-[120px] border-[1px] border-[#515151] rounded-[8px] cursor-pointer ${selectedPlatforms.includes(platform) ? "bg-gray-700" : "transparent"}`}
                                key={platform}
                                onClick={() => handlePlatformToggle(platform)}
                            >
                                <Image
                                    src="/vr-chat.png"
                                    alt="VR Chat"
                                    width={52}
                                    height={24}
                                    className="min-w-[60px] cursor-pointer"
                                />
                                <p className="p-2 text-[10px]">
                                    {platform}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between p-6 border-t-[1px] border-t-[#5C5C5C]">
                    <button
                        onClick={handleClear}
                        className="text-sm "
                    >
                        Clear all
                    </button>
                    <button
                        onClick={handleApply}
                        className="bg-custom-white text-black px-16 py-2 rounded-md"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
