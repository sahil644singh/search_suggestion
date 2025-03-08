import React from 'react';

const SearchResults = ({ products }) => {
  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={product.image1}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg p-2"
              />
              <div className="p-4">
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-800 font-bold text-2xl">₹{product.price}</p>
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl text-gray-500 mt-4">Result not found</p>
      )}
    </div>
  );
};

export default SearchResults;
