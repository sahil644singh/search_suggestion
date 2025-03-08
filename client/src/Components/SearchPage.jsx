import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import Suggestions from './Suggestions';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        setIsTyping(true);
    };

    // Fetch suggestions as the user types (debounced)
    useEffect(() => {
        if (isTyping && searchQuery.trim() !== '') { // Only fetch if there's actual text
            const timer = setTimeout(async () => {
                try {
                    const response = await fetch(`http://localhost:3000/suggested?search=${searchQuery}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch suggestions');
                    }
                    const data = await response.json();
                    setSuggestedProducts(data.suggestedKeywords);
                    setIsTyping(false);
                } catch (err) {
                    setError(err.message);
                    setIsTyping(false);
                }
            }, 200); //debouncing delay

            return () => clearTimeout(timer);
        } else if (searchQuery.trim() === '') {
            // Clear suggestions if search query is empty
            setSuggestedProducts([]);
            setIsTyping(false);
        }
    }, [searchQuery, isTyping]);

    // Handle form submission (search button)
    const handleSearchSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true); // Show loading state
        setError(null);
        setProducts([]);
        setSuggestedProducts([]);  // Clear suggestions on submit

        try {
            const response = await fetch(`http://localhost:3000/api?search=${searchQuery || 'orange'}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setProducts(data.fetchedProducts);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Hide loading state when search is done
        }
    };

    // Handle suggestion click (trigger search on suggestion click)
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);  
        setSuggestedProducts([]);    
        handleSearchSubmit({ preventDefault: () => { } });  // Trigger search immediately without page reload
    };

    // Perform search on page load (with default query)
    useEffect(() => {
        if (!searchQuery) {
            handleSearchSubmit({ preventDefault: () => {} }); 
        }
    }, []); 
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">Search Products</h1>

            <div className="flex justify-center mb-6 relative">
                <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                        className="p-2 border border-black rounded-md w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600">
                        Search
                    </button>

                    {/* Display suggested products below the search input */}
                    <div className="absolute top-full left-0 w-full">
                        <Suggestions
                            suggestedProducts={suggestedProducts}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            setSuggestedProducts={setSuggestedProducts}
                            onSuggestionClick={handleSuggestionClick}
                            handleSearchSubmit={handleSearchSubmit}
                        />
                    </div>
                </form>
            </div>

            {/* Loading indicator */}
            {loading && (
                <div className="flex justify-center items-center my-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    <span className="ml-4 text-gray-500">Loading...</span>
                </div>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Products grid */}
            <SearchResults products={products} />
        </div>
    );
};

export default SearchPage;
