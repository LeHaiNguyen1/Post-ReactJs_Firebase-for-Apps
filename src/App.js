import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import RegiterEdit from '../src/components/auth/RegiterEdit';

function App() {
    return (
        <div className="container">
            <Router>
                <Routes> 
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/signin" element={<Login/>}/>
                    <Route path="/RegiterEdit" element={<RegiterEdit/>}/>
                    <Route
                        path="/"
                        element={
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <AddArticle/>
                                </div>
                                <div className="col-md-8">
                                    <Articles/>
                                </div>
                            </div>
                        }
                    />
                </Routes>
                <Navbar/>
            </Router>
        </div>
    );
}

export default App;
