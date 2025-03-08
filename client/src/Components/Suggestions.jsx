import React, { useEffect } from 'react';

const Suggestions = ({ suggestedProducts, searchQuery,setSearchQuery,setSuggestedProducts,handleSearchSubmit }) => {
  // Debugging the props
//   useEffect(() => {
//     console.log('Suggested Products:', suggestedProducts);
//     console.log('Search Query:', searchQuery);
//   }, [suggestedProducts, searchQuery]);
    
    const Sugested_items = (search_term)=>{
        console.log(search_term);
        setSearchQuery(search_term)
        handleSearchSubmit({preventDefault: ()=>{}})
        setSuggestedProducts([])
        
    }

  return (
    <div className="mt-4">
      {/* Show suggestions when there IS a search query and there are suggestions available */}
      {suggestedProducts.length > 0 && searchQuery && (
        <div className="bg-white shadow-md rounded p-2 absolute z-10 w-full max-w-md">
          <h3 className="font-semibold mb-2">Suggested Products:</h3>
          <ul>
            {suggestedProducts.map((product, index) => (
              <li 
              onClick={()=>Sugested_items(product)}
                key={index} 
                className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
              >
                {product}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Suggestions;