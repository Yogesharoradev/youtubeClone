
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Feed from "./components/Feed"
import SearchFeed from "./components/SearchFeed"
import VideoDetail from "./components/VideoDetail"

function App() {
 
  return (
   <>
   
        
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Feed/>} />
          <Route path="/search/:searchTerm"  element={<SearchFeed/>} />
          <Route path="/video/:id"  element={<VideoDetail/>} />
        </Routes>
        </BrowserRouter>


   
   </>
  )
}

export default App
