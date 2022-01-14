import './header-User/HeadUser.css';
import HeadUser from './header-User/HeadUser'
import {Route, BrowserRouter as Router} from "react-router-dom";
import CreateUser from './createUser'; //crear
import ViewUser from './viewUser'; //ver


const MenuUser = (props) => {


  return (
    <div className="MenuUser">
      <Router>

        <Route path="/MenuUser" exact component={HeadUser} id_mayor={props.id_mayor}/>
        <Route path="/MenuUser/CrearUser" component={CreateUser} id_mayor={props.id_mayor}/>
        <Route path="/MenuUser/VerUser" component={ViewUser}/>
       
      </Router>
      hi
    </div>
  );
}
//<Route path="/MenuProf/VerProf" component={ViewUser} id_mayor={props.id_mayor}/>
export default MenuUser;
