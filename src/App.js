import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Switch, Route } from 'react-router-dom';
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";
import ConfirmationPage from "./components/ConfirmationPage";
import Tracking from "./components/Tracking";
import Contact from "./components/Contact";
import Message from "./components/Message";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/confirmationpage" component={ConfirmationPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/registerForm" component={RegisterForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tracking" component={Tracking} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/message" component={Message} />


      </Switch>
    </>
  );
}

export default App;
