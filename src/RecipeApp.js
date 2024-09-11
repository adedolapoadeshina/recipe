import { useEffect,useState } from "react"
import axios from "axios"
import Nav from "./RecipeComponents/Nav"
import Banner from "./RecipeComponents/Banner"
import List from "./RecipeComponents/List"
import Footer from "./RecipeComponents/Footer"
import Copy from "./RecipeComponents/Copy"



const RecipeApp=()=>{
    const [loading,setLoading]=useState(true)
    const[error,setError]=useState(false)
    const[recipes,setRecipes]=useState([])
    const[frecipes,setFRecipes]=useState([])
    const[keyword,setKeyword]=useState("")



useEffect(()=>{
    makeApiCall()
},[])

//handling filtering
const handleFilter=()=>{
    const filtered_recipes=recipes.filter((recipe)=>{
        return recipe.name.toLowerCase().includes(keyword.toLowerCase())
    })

    setFRecipes(filtered_recipes)
}

function makeApiCall(){
    axios.get('https://dummyjson.com/recipes')
    .then(function(resp){
        console.log(resp.data.recipes);
        setLoading(false);
        setRecipes(resp.data.recipes);
    })
    .catch(function(err){
        console.log(err);
        setError(true);
        setLoading(false);
    })
}







    return(
    <div>
        <Nav/>
        <Banner keyword={keyword} setKeyword={setKeyword} handleFilter={handleFilter}/>
        <List loading={loading} error={error} recipes={recipes} keyword={keyword} frecipes={frecipes}/>
        <Footer/>
        <Copy/>
    </div>
    )
}

export default RecipeApp