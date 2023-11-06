"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import ProductCard from './ProductCard';

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
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    
    const searchResult = await filterProducts(e.target.value);
    console.log(searchResult);
    setSearchedResults(searchResult);

    
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
      <ProductCardList
      data={searchedResults}
      handleTagClick={handleTagClick}/>
        ) : (
        <div> Wpisz materiał z którym nie wiesz co zrobić </div>
     )}
      
    </section>
  )
}

export default Feed