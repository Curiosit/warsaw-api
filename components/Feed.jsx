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
      <div className="mt-0 prompt_layout">
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
  const [shouldRender, setShouldRender] = useState(false);
  const [imagePath, setImagePath] = useState("zmieszane.png");
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    
    const searchResult = await filterProducts(e.target.value);
    setMostCommonType(findMostCommonType(searchResult))
    console.log(searchResult);
    console.log(mostCommonType);
    setSearchedResults(searchResult);
    setImagePath(switchImagePath(findMostCommonType(searchResult)));
    console.log(imagePath);
    setShouldRender(searchText.length > 0 && searchResult.length > 0);
    console.log(searchText.length > 0);
    console.log(searchResult.length > 0);
    console.log(shouldRender);
    console.log(searchText);
    console.log(searchResult)
  };
  const handleTagClick = (tagName) => {
    
  };

  useEffect(() => {
    
    console.log(searchedResults);
    
    
  }, [searchedResults]);

  const fetchData = async (q) => {
    if(q.length > 0) {

      
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
    else {
      console.log("Za krótkie zapytanie!")
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
    console.log(value)
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
      console.log(type);
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
    console.log(uniqueTypes);
    console.log(mostCommonType);
    return mostCommonType;
  }

  async function eventAskAI () {
    const headers = {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
      }
  
    }
    const apiAIUrl = 'https://cyz7bkwwhl.execute-api.us-west-2.amazonaws.com/production/askai';
    var description = '';
    description = searchText;
    //description = JSON.stringify(describeBuilding(building));
    const responsefield=document.getElementById("airesponse");
    const secondPart = generatePrompt();
    const ask = secondPart + description ;
    
    const question = { "question": ask};
    const jsonQuestion = JSON.stringify(question);
    const jsonBody = JSON.stringify({body : question});
    console.log(jsonQuestion);
    responsefield.innerHTML = "re/wars.ai analizuje twoje pytanie... poczekaj sekundę...";
    const response = await fetch(apiAIUrl, {method: 'POST', body: jsonQuestion}, headers);
    console.log(response);
    var body = await response.text();
    console.log(body);
    
    responsefield.innerHTML = body;
  }

  function generatePrompt () {
    const rand = getRandomInt(1);
    console.log(rand);
        if (rand == 0) {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
            
        } else if (rand == 1) {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
        } else if (rand == 2) {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
        } else if (rand == 3) {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
        } else if (rand == 4) {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
        }else {
            return " Napisz bardzo krótko, jak wykorzystać ten materiał ponownie: ";
        }
    
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
      <div>
              <div className='answer_card' >
                <div className='flex justify-between items-start gap-5'>
                  <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                
                  >
                    <div className='flex flex-col'>
                      <h3 className='font-satoshi font-semibold text-gray-900'>

                      </h3>
                      <p id="airesponse" className='font-inter text-sm text-gray-500'>
                      Zapytaj bota re/wars.ai o poradę jak ponownie wykorzystać ten materiał - klikając w obrazek po prawej!
                      </p>
                      
                    </div>
                  </div>
                  <div className='ai_btn' >
                        <Image
                            src={"/images/aibot.png"}
                            alt='user_image'
                            key={new Date().getTime()}
                            width={150}
                            height={150}
                            onClick={eventAskAI}
                            className='rounded-full object-contain spin2'
                        />
                  </div>
                </div>
              </div>
              </div>
      {shouldRender ? (
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
                            key={new Date().getTime()}
                            width={100}
                            height={100}
                            className='rounded-full object-contain'
                        />
                  </div>
                </div>
              </div>
        
      <ProductCardList
      data={searchedResults}
      handleTagClick={handleTagClick}/>
        </div>) : <>{searchText.length>0 ? (
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
                  Na razie nie udało się znaleźć takiego produktu, wpisz pełną nazwę...
                  </p>
                  
                </div>
              </div>
              
            </div>
          </div> </div>
        ):(
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
                Wpisz materiał z którym nie wiesz co zrobić...
                </p>
                
              </div>
            </div>
            
          </div>
        </div> </div>)
     }</>}
      
    </section>
  )
}

export default Feed