import Articles from "./components/home/Articles";
import AddArticle from "./components/addArticle/AddArticle";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import RegiterEdit from './components/resetPassword/RegiterEdit';

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
