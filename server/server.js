const express = require('express');
const app = express();
const port = 3000;
var searchq = "orange";

// Middleware to handle CORS
app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 

    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, lat, lon');

   
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next(); 
});

app.get('/api', async (req, res) => {
    searchq = req.query.search;
    const apiUrl = `https://blinkit.com/v6/search/products?q=${searchq}`;

    
    const lat = '28.7041';  
    const lon = '77.1025';  

    try {
        // Sending the request to the Blinkit API
        const response = await fetch(apiUrl, {
            method: 'GET',  
            headers: {
                'lat': lat,  
                'lon': lon,  
                'Content-Type': 'application/json',  
            }
        });

        
        if (response.ok) {
            const data = await response.json();  

            // Map the products data
            const productsInfo = data.products.map(product => ({
                name: product.name,
                price: product.price,
                image1: product.images[0],  
                image2: product.images[1],   
            }));

            res.json({
                message: 'API request successful!',
                fetchedProducts: productsInfo,  
            });
        } else {
            res.status(response.status).json({
                message: 'Failed to fetch data from Blinkit API',
                error: await response.text()  
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error making request to Blinkit API',
            error: error.message  
        });
    }
});





// api route for suggested items
app.get('/suggested', async (req, res) => {
    const searchq = req.query.search || ''; 
    const apiUrl = `https://blinkit.com/v6/search/products?q=${searchq}`;

    const lat = '28.7041';  
    const lon = '77.1025';  

    try {
        
        const response = await fetch(apiUrl, {
            method: 'GET',  
            headers: {
                'lat': lat,  
                'lon': lon,  
                'Content-Type': 'application/json',  
            }
        });

        
        if (response.ok) {
            const data = await response.json();  // Parse the JSON response

           
            const suggestedKeywords = data.suggested_keywords?.data || [];  

            // Return the array of suggested keywords
            res.json({
                suggestedKeywords: suggestedKeywords,
                message: suggestedKeywords.length > 0 ? 'Suggestions found!' : `No suggestions found for "${searchq}".`
            });
        } else {
            res.status(response.status).json({
                message: 'Failed to fetch data from Blinkit API',
                error: await response.text()  
            });
        }

    } catch (error) {
        
        res.status(500).json({
            message: 'Error making request to Blinkit API',
            error: error.message  
        });
    }
});



app.get('/', (req, res) => {
    res.send('Backend Server is running Fine: Head to  http://localhost:5173/ ');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
