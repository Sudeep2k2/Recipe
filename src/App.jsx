// import './App.css';
// import { useState, useEffect } from 'react';
// import searchIcon from '../src/assets/search.svg';
// import logo from '../src/assets/logo.svg';
// import React from 'react';

// function App() {
//   const [randomRecipes, setRandomRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [noResults, setNoResults] = useState(false);
//   const [selectedCuisine, setSelectedCuisine] = useState('');

//   const fetchRecipes = async (pageNum, query = '', cuisine = '') => {
//     setLoading(true);
//     setNoResults(false);

//     try {
//       let url = '';
//       if (query) {
//         url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}&page=${pageNum}`;
//       } else if (cuisine) {
//         url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&page=${pageNum}`;
//       } else {
//         url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American&page=${pageNum}`;
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
//     const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
//     if (bottom && !loading) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     fetchRecipes(page, searchQuery, selectedCuisine);
//   }, [page, searchQuery, selectedCuisine]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

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

//   return (
//     <div className="min-h-screen bg-[#deb025]">
//       <div className="max-w-[2000px] mx-auto">
//         {/* Navbar */}
//         <div className="w-full bg-[#fdca33] text-[#620e04] font-bold shadow-lg">
//           <div className="max-w-7xl mx-auto px-4 py-4 flex flex-row md:flex-row items-center justify-between gap-4">
//             <a href="#" className="flex-shrink-0">
//               <img className="h-10 w-20" src={logo} alt="Logo" />
//             </a>

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
//                   <img src={searchIcon} alt="Search" className="w-4 h-4" />
//                 </button>
//               </div>
//             </form>

//             {/* Cuisines */}
//             <div className="hidden md:flex space-x-5 font-bold text-lg">
//               <a href="#" onClick={() => handleCuisineClick('Italian')} className="hover:text-[#8b1507]">Italian</a>
//               <a href="#" onClick={() => handleCuisineClick('Mexican')} className="hover:text-[#8b1507]">Mexican</a>
//               <a href="#" onClick={() => handleCuisineClick('Indian')} className="hover:text-[#8b1507]">Indian</a>
//               <a href="#" onClick={() => handleCuisineClick('Chinese')} className="hover:text-[#8b1507]">Chinese</a>
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
//                     src={recipe.strMealThumb}
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


import './App.css';
import { useState, useEffect } from 'react';
import searchIcon from '../src/assets/search.svg';
import logo from '../src/assets/logo.svg';
import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'; // Import necessary components

function App() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  const fetchRecipes = async (pageNum, query = '', cuisine = '') => {
    setLoading(true);
    setNoResults(false);

    try {
      let url = '';
      if (query) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}&page=${pageNum}`;
      } else if (cuisine) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}&page=${pageNum}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American&page=${pageNum}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        setRandomRecipes((prevRecipes) => {
          const newRecipes = data.meals.filter(recipe =>
            !prevRecipes.some(prevRecipe => prevRecipe.idMeal === recipe.idMeal)
          );
          return [...prevRecipes, ...newRecipes];
        });
      } else if (query && data.meals === null) {
        setNoResults(true);
        setRandomRecipes([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchRecipes(page, searchQuery, selectedCuisine);
  }, [page, searchQuery, selectedCuisine]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setRandomRecipes([]);
    setPage(1);
    setSelectedCuisine('');
    fetchRecipes(1, searchQuery);
  };

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisine(cuisine);
    setRandomRecipes([]);
    setPage(1);
  };

  return (
    <Router> {/* Wrap the app in Router */}
      <div className="min-h-screen bg-[#deb025]">
        <div className="max-w-[2000px] mx-auto">
          {/* Navbar */}
          <div className="w-full bg-[#fdca33] text-[#620e04] font-bold shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-row md:flex-row items-center justify-between gap-4">
              <Link to="/"> {/* Link to the home page */}
                <img className="h-10 w-20" src={logo} alt="Logo" />
              </Link>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="w-full md:w-96">
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
                    <img src={searchIcon} alt="Search" className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Cuisines */}
              <div className="hidden md:flex space-x-5 font-bold text-lg">
                <a href="#" onClick={() => handleCuisineClick('Italian')} className="hover:text-[#8b1507]">Italian</a>
                <a href="#" onClick={() => handleCuisineClick('Mexican')} className="hover:text-[#8b1507]">Mexican</a>
                <a href="#" onClick={() => handleCuisineClick('Indian')} className="hover:text-[#8b1507]">Indian</a>
                <a href="#" onClick={() => handleCuisineClick('Chinese')} className="hover:text-[#8b1507]">Chinese</a>
              </div>
            </div>
          </div>

          {/* Routes Setup */}
          <Routes>
            <Route path="/" element={(
              <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {randomRecipes.length > 0 ? (
                    randomRecipes.map((recipe) => (
                      <div key={recipe.idMeal} className="card p-4 flex flex-col rounded-lg bg-[#ffe687] shadow-lg hover:shadow-xl">
                        <img
                          src={recipe.strMealThumb}
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
                  ) : (
                    <div className="col-span-full text-red-500 text-center font-semibold">
                      <span className="font-bold">OOPS! </span>The recipe with the following search keyword is not present.
                    </div>
                  )}
                </div>

                {/* Loader */}
                {loading && (
                  <div className="flex justify-center mt-8">
                    <div className="w-8 h-8 border-4 border-[#620e04] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;