// components/Layout.jsx
import Header from './Header'; // Import the Header component

const Layout = ({
    children,
    categories,
    onCategoryChange,
    onSearchChange,
    selectedCategory,
    handleApplyFilters,
    setFilteredProducts,
}) => {
    return (
        <div className="min-h-screen">
            {/* Header is included here, with props passed from Layout's parent */}
            <Header
                categories={categories}
                onCategoryChange={onCategoryChange}
                onSearchChange={onSearchChange}
                selectedCategory={selectedCategory}
                handleApplyFilters={handleApplyFilters}
                setFilteredProducts={setFilteredProducts}
            />

            {/* The dynamic content passed as children */}
            <main className='wrapper'>{children}</main>
        </div>
    );
};

export default Layout;
