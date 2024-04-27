import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";

function Search() {

  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const fetchGames = async () => {
      const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platforms=187,18,4&search=${searchTerm}&search_exact=false`);
      const data = await response.json();
      setSearchResults(data.results || []);
    };

    if (searchTerm.trim() !== '') {
      fetchGames();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <Container>
      <Form>
        <FaSearch priority />
        <input value={searchTerm}
          onChange={handleSearch}
          type="text" />
      </Form>
      <Results>
        {searchResults.map(game => (
          <Card key={game.id}>

            <img src={game.background_image} alt="" />

            <p >{game.name}</p>

          </Card>
        ))}
      </Results>
    </Container>
  )
}

// const Wrapper = styled.div`

//     display: flex;
//     /* width: ; */
//     /* grid-template-columns: repeat(4,1fr); */
//     /* flex-wrap: wrap; */
//     justify-content: center;
//     align-items: center;

// `

// const Card = styled.div`
//     background-color: white;
//     top: -30px;
//     left: 30em;
//     margin: 10px;
//     display:block;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
//     width: 100%;
//     overflow: hidden;
//     position: relative;
//     padding: 2rem 9em;

//     img {
//         position: absolute;
//         top : 0px;
//         width: 113px;
//         /* height: 100px; */
//         object-fit: cover;
//         left: 0px;
//     }
//     p {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         text-align: center;
//         position: absolute;
//         z-index: 10;
//         left: -25%;
//         bottom: -25%;
//         padding: 10px 0 ;
//         transform: translate(0%, -50%);
//         color: #000000;
//         width: 100%;
//         text-align: center;
//         font-weight: 600;
//         font-size: 0.8rem;
//     }
// `;

const Container = styled.div`
    display: flex;
    
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
`;

const Results = styled.div`
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    gap:px;
    justify-content: center;
    align-items: center;
    margin: 0rem 30rem;
    max-height: 10px;
    max-width:800px; //Limit the height of the results
    z-index: 11;
    /* position: absolute; */
    /* top:8rem; */
    /*overflow-y: auto; */
    display: flex;
    width: 50%;
    flex-direction: column;
    max-height: 220px;
    /* max-width: 800px; */
    margin-top: 4.5rem;
    position: absolute;
    overflow-y: scroll;
    /* top: 370px; */
    z-index: 11;

`;

const Card = styled.div`
    background-color: #ffffff;
    border-radius: none;
    
    /* overflow: auto; */
    /* padding: 10px; */
    width: 100%;
    height: 100%;
    text-align: start;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    /* transition: transform 0.2s; */

    /* &:hover {
        transform: translateY(-5px);
    } */

    img {
      display: inline-block;
      
      position: relative;
      top: 10px;
      left: 10px;
        width: 10%;
        /* height: 100%; */
        border-radius: none;
    }

    p {      
      display: inline-block;

      position: relative;
      color: black;
      top: px;
      left:2rem;
        /* margin-top: 10px; */
        font-weight:bolder;
    }
`;
const Form = styled.div`
background-color: #ff0000;
    width: 50%;
    height: 2.5rem;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10rem;
    overflow: hidden;
    margin: 1.5rem;
    /* display: flex;
    align-items: center;
    position: relative;
    width: 50%;
    height:2.5rem;
    overflow: hidden;
    top: 10px; */
    input{
    padding: 0px 50px;
    margin-left: 5;
    outline: none;
    font-size: 1.25rem;
    border: none;
    height: 100%;
    width: 100%;
  }
  svg{
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 2em;
    color: #000000;
    background-color: transparent;
    border: none;
    transform: translate(-50%,-50%);
  }
`
export default Search