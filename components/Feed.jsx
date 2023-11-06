"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import ProductCard from './ProductCard';
import Image from "next/image";
const ProductCardList = ({ data, handleTagClick}) => {
  
  console.log("mapping");
  
  console.log(data);
  if(data){
    return (
      <div className="mt-16 prompt_layout">
        {data.map((product) => (
          <ProductCard 
          
          key={product.Nazwa}
          product={product}
          handleTagClick={handleTagClick}
          />
        ))}
  
      </div>
  
  
    )
  }
  else {
    return ( <div className="mt-16 prompt_layout"> </div> );
  }
  
}


const Feed = () => {
  
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [mostCommonType, setMostCommonType] = useState("");
  const [moreTypes, setMoreTypes] = useState(false);
  const [imagePath, setImagePath] = useState("zmieszane.png");
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    
    const searchResult = await filterProducts(e.target.value);
    setMostCommonType(findMostCommonType(searchResult))
    console.log(searchResult);
    setSearchedResults(searchResult);
    setImagePath(switchImagePath(mostCommonType));
    
  };
  const handleTagClick = (tagName) => {
    
  };

  useEffect(() => {
    
    console.log(searchedResults);
    
    
  }, [searchedResults]);

  const fetchData = async (q) => {
    try {
      console.log("try fetching rewars query");
      const query = "https://api.um.warszawa.pl/api/action/datastore_search/?resource_id=64b9d66c-d134-4a87-9f24-258676e9e498&limit=5&q=" + q
      console.log(query);
      const promise = (await fetch(query));
      const answers = await promise.json();
      //const data = JSON.parse(answers);
      const data = JSON.parse(JSON.stringify(answers));
      console.log(data.result.records);
      return new Response(JSON.stringify(data.result.records),{ status: 200 } )

    } catch (error) {
      return new Response ("Nie udało się zadać pytania", {status: 500})
    }
  }
  const filterProducts = async (searchtext) => {
    console.log("filter");
    const response = await fetchData(searchtext);
    
    console.log(response);
    const data = await response.json();
    console.log(data);
    const result = JSON.parse(JSON.stringify(data));
    console.log(result);
    return result
  };
  const filterProducts2 = async (searchtext) => {
    console.log("filter");
    const response = await fetch('/api/search/'+searchtext);
    
    console.log(response);
    const data = await response.json();
    console.log(data);
    const result = JSON.parse(JSON.stringify(data));
    console.log(result);
    return result
  };

  function switchImagePath(value) {
    switch (value) {
      case "Papier":
        return "papier.png";
      case "Gabaryty":
        return "gabaryty.png";
      case "Metale i tworzywa sztuczne":
        return "metaleitworzywa.png";
      case "Szkło":
        return "szklo.png";
      case "Bioodpady":
        return "zielone.png";
      default:
        return "zmieszane.png";
    }
  }

  function findMostCommonType(data) {
    // Create an object to store the count of each type
    const typeCount = {};
  
    // Iterate through the JSON data
    data.forEach(function (entry) {
      const type = entry.Typ;
  
      // If the type is not in the count object, initialize it with a count of 1
      if (!typeCount[type]) {
        typeCount[type] = 1;
      } else {
        // If the type is already in the count object, increment its count
        typeCount[type]++;
      }
    });
  
    let mostCommonType = "";
    let maxCount = 0;
  
    // Iterate through the count object to find the most common type
    for (const type in typeCount) {
      if (typeCount[type] > maxCount) {
        mostCommonType = type;
        maxCount = typeCount[type];
      }
    }
    // Check if there is more than one type
    const uniqueTypes = Object.keys(typeCount).length;
    setMoreTypes(uniqueTypes > 1);
  
    return mostCommonType;
  }

  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"
        placeholder="produkt..."
        value={searchText} 
        required
        onChange={handleSearchChange}
        className="search_input peer"
        />

      </form>
      {searchedResults.length > 0 ? (
        <div>
              <div className='answer_card' >
                <div className='flex justify-between items-start gap-5'>
                  <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                
                  >
                    <div className='flex flex-col'>
                      <h3 className='font-satoshi font-semibold text-gray-900'>

                      </h3>
                      <p className='font-inter text-sm text-gray-500'>
                      {moreTypes ? ( <>Najprawdopodobniej najlepiej wyrzucić do <b>{mostCommonType}</b>. </>) 
                      : (<>Najlepiej wyrzucić do <b>{mostCommonType}</b>. </>) }
                      </p>
                      <p className='font-inter text-sm text-gray-500'>
                      {moreTypes ? ( <>Jest kilka możliwości. Sprawdź poniżej możliwe kategorie i znajdź najbardziej odpowiednią: </>) 
                      : (<>Poniżej lista różnych kategorii produktów: </>) }
                      
                      </p>
                      
                    </div>
                  </div>
                  <div className='quote_btn' >
                        <Image
                            src={"/images/categories/"+imagePath}
                            alt='user_image'
                            width={50}
                            height={50}
                            className='rounded-full object-contain'
                        />
                  </div>
                </div>
              </div>
        
      <ProductCardList
      data={searchedResults}
      handleTagClick={handleTagClick}/>
        </div>) : (
        <div> Wpisz materiał z którym nie wiesz co zrobić </div>
     )}
      
    </section>
  )
}

export default Feed