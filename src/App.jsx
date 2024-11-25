// import './App.css';
// import { useState, useEffect } from 'react';
// import React from 'react';
// import searchIcon from '../src/assets/search.svg';
// import logo from '../src/assets/logo.svg';

// function App() {
//   const [randomRecipes, setRandomRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [noResults, setNoResults] = useState(false);
//   const [selectedCuisine, setSelectedCuisine] = useState('');
//   const [showSplash, setShowSplash] = useState(true);
//   const [isHomePage, setIsHomePage] = useState(true);

//   const fetchRecipes = async (pageNum, query = '', cuisine = '') => {
//     setLoading(true);
//     setNoResults(false);

//     try {
//       let url = '';
//       if (query) {
//         url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}&page=${pageNum}`;
//         setIsHomePage(false);
//       } else if (cuisine) {
//         url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&page=${pageNum}`;
//         setIsHomePage(false);
//       } else {
//         url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American&page=${pageNum}`;
//         setIsHomePage(true);
//       }

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.meals) {
//         setRandomRecipes((prevRecipes) => {
//           const newRecipes = data.meals.filter(recipe =>
//             !prevRecipes.some(prevRecipe => prevRecipe.idMeal === recipe.idMeal)
//           );
//           return [...prevRecipes, ...newRecipes];
//         });
//       } else if (query && data.meals === null) {
//         setNoResults(true);
//         setRandomRecipes([]);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//       setLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     if (!isHomePage) return; // Only handle infinite scroll on home page
    
//     const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
//     if (bottom && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     // Show splash screen for 3 seconds on initial load
//     setShowSplash(true);
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     fetchRecipes(page, searchQuery, selectedCuisine);
//   }, [page, searchQuery, selectedCuisine]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [isHomePage]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setRandomRecipes([]);
//     setPage(1);
//     setSelectedCuisine('');
//     fetchRecipes(1, searchQuery);
//   };

//   const handleCuisineClick = (cuisine) => {
//     setSelectedCuisine(cuisine);
//     setRandomRecipes([]);
//     setPage(1);
//   };

//   const handleLogoClick = () => {
//     setSearchQuery('');
//     setSelectedCuisine('');
//     setRandomRecipes([]);
//     setPage(1);
//     setIsHomePage(true);
//     fetchRecipes(1, '', '');
//   };

//   if (showSplash) {
//     return (
//       <div className="min-h-screen bg-[#deb025] flex items-center justify-center">
//         <img 
//           src={logo} 
//           alt="Logo" 
//           className="w-auto h-40 animate-pulse"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#deb025]">
//       <div className="max-w-[2000px] mx-auto">
//         {/* Navbar */}
//         <div className="w-full bg-[#fdca33] text-[#620e04] font-bold shadow-lg">
//           <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
//             <button onClick={handleLogoClick} className="flex-shrink-0">
//               <img className="h-10 w-20" src={logo} alt="Logo" />
//             </button>

//             {/* Search Bar */}
//             <form onSubmit={handleSearchSubmit} className="w-full md:w-96">
//               <div className="flex">
//                 <input
//                   className="h-10 flex-grow rounded-l-md p-1 pl-3 bg-[#f5e0a1] text-[#620e04] placeholder-[#620d04a1]"
//                   type="text"
//                   placeholder="Enter the ingredient"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//                 <button
//                   type="submit"
//                   className="rounded-r-md h-10 px-3 bg-[#f5e0a1] flex items-center justify-center"
//                 >
//                   <svg 
//                     className="w-4 h-4" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24" 
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </form>

//             {/* Cuisines */}
//             <div className="hidden md:flex space-x-5 font-bold text-lg">
//               <button onClick={() => handleCuisineClick('Italian')} className="hover:text-[#8b1507]">Italian</button>
//               <button onClick={() => handleCuisineClick('Mexican')} className="hover:text-[#8b1507]">Mexican</button>
//               <button onClick={() => handleCuisineClick('Indian')} className="hover:text-[#8b1507]">Indian</button>
//               <button onClick={() => handleCuisineClick('Chinese')} className="hover:text-[#8b1507]">Chinese</button>
//             </div>
//           </div>
//         </div>

//         {/* Recipe Grid */}
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {randomRecipes.length > 0 ? (
//               randomRecipes.map((recipe) => (
//                 <div key={recipe.idMeal} className="card p-4 flex flex-col rounded-lg bg-[#ffe687] shadow-lg hover:shadow-xl">
//                   <img
//                     src={recipe.strMealThumb || "/api/placeholder/400/320"}
//                     alt={recipe.strMeal}
//                     className="w-full h-40 object-cover rounded-t-lg mb-4"
//                   />
//                   <h3 className="text-lg font-semibold text-center text-[#620e04]">{recipe.strMeal}</h3>
//                   <p className="text-sm text-center text-[#620e04]">{recipe.strCategory}</p>
//                   <a
//                     href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-2 bg-[#620e04] text-white p-2 rounded-md font-bold text-center hover:bg-[#8b1507]"
//                   >
//                     View Recipe
//                   </a>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full text-red-500 text-center font-semibold">
//                 <span className="font-bold">OOPS! </span>The recipe with the following search keyword is not present.
//               </div>
//             )}
//           </div>

//           {/* Loader */}
//           {loading && (
//             <div className="flex justify-center mt-8">
//               <div className="w-8 h-8 border-4 border-[#620e04] border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import './app.css';
import { useState, useEffect } from 'react';
import React from 'react';
import logo from '../src/assets/slogo.svg';

function App() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [showSplash, setShowSplash] = useState(true);
  const [isHomePage, setIsHomePage] = useState(true);

  // Function to get random items from an array
  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const fetchRecipes = async (pageNum, query = '', cuisine = '') => {
    setLoading(true);
    setNoResults(false);

    try {
      let url = '';
      if (query) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        setIsHomePage(false);
      } else if (cuisine) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`;
        setIsHomePage(false);
      } else {
        // For homepage, fetch multiple cuisines and combine results
        const cuisines = ['American', 'British', 'Canadian', 'French', 'Italian', 'Chinese', 'Indian', 'Mexican'];
        const randomCuisines = getRandomItems(cuisines, 3); // Get 3 random cuisines
        const results = await Promise.all(
          randomCuisines.map(cuisine => 
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
              .then(res => res.json())
          )
        );
        
        const allMeals = results.flatMap(result => result.meals || []);
        const randomMeals = getRandomItems(allMeals, 9 * pageNum); // 9 items per page
        
        setRandomRecipes(randomMeals);
        setLoading(false);
        setIsHomePage(true);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        if (query) {
          // For search results, replace existing recipes
          setRandomRecipes(data.meals);
        } else if (cuisine) {
          // For cuisine filter, replace existing recipes
          setRandomRecipes(data.meals);
        }
        setNoResults(false);
      } else {
        // Only set noResults true for search queries, not cuisine filters
        if (query) {
          setNoResults(true);
          setRandomRecipes([]);
        }
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (!isHomePage || loading) return;
    
    const bottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;
    if (bottom) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    // Show splash screen for 3 seconds on initial load
    setShowSplash(true);
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHomePage) {
      fetchRecipes(page);
    }
  }, [page]);

  useEffect(() => {
    if (!isHomePage) {
      fetchRecipes(1, searchQuery, selectedCuisine);
    }
  }, [searchQuery, selectedCuisine]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, loading]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setRandomRecipes([]);
    setPage(1);
    setSelectedCuisine('');
    setIsHomePage(false);
    fetchRecipes(1, searchQuery, '');
  };

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
    setSearchQuery('');
    setRandomRecipes([]);
    setPage(1);
    setIsHomePage(false);
    fetchRecipes(1, '', cuisine);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setRandomRecipes([]);
    setPage(1);
    setIsHomePage(true);
    fetchRecipes(1, '', '');
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#deb025] flex items-center justify-center">
        <img 
          src={logo}
          alt="Logo" 
          className="w-auto h-40 animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#deb025]">
      <div className="max-w-[2000px] mx-auto">
        {/* Navbar */}
        <div className="w-full bg-[#fdca33] text-[#620e04] font-bold shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-row justify-between md:flex-row items-center  gap-4">
            <button onClick={handleLogoClick} className="flex-shrink-0">
              <img className="h-10 w-20" src={logo} alt="Logo" />
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="md:w-96">
              <div className="flex">
                <input
                  className="h-10 flex-grow rounded-l-md p-1 pl-3 bg-[#f5e0a1] text-[#620e04] placeholder-[#620d04a1]"
                  type="text"
                  placeholder="Enter the ingredient"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="rounded-r-md h-10 px-3 bg-[#f5e0a1] flex items-center justify-center"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Cuisines */}
            <div className="hidden md:flex space-x-5 font-bold text-lg">
              <button onClick={() => handleCuisineClick('Italian')} className="hover:text-[#8b1507]">Italian</button>
              <button onClick={() => handleCuisineClick('Mexican')} className="hover:text-[#8b1507]">Mexican</button>
              <button onClick={() => handleCuisineClick('Indian')} className="hover:text-[#8b1507]">Indian</button>
              <button onClick={() => handleCuisineClick('Chinese')} className="hover:text-[#8b1507]">Chinese</button>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {randomRecipes.length > 0 ? (
              randomRecipes.map((recipe) => (
                <div key={recipe.idMeal} className="card p-4 flex flex-col rounded-lg bg-[#ffe687] shadow-lg hover:shadow-xl">
                  <img
                    src={recipe.strMealThumb || "/api/placeholder/400/320"}
                    alt={recipe.strMeal}
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center text-[#620e04]">{recipe.strMeal}</h3>
                  <p className="text-sm text-center text-[#620e04]">{recipe.strCategory}</p>
                  <a
                    href={`https://www.themealdb.com/meal/${recipe.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 bg-[#620e04] text-white p-2 rounded-md font-bold text-center hover:bg-[#8b1507]"
                  >
                    View Recipe
                  </a>
                </div>
              ))
            ) : noResults ? (
              <div className="col-span-full text-red-500 text-center font-semibold">
                <span className="font-bold">OOPS! </span>The recipe with the following search keyword is not present.
              </div>
            ) : null}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="w-8 h-8 border-4 border-[#620e04] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;