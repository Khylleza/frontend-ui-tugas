import "./login.scss"; 
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Login = () => { 
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const {dispatch} = useContext(AuthContext, DarkModeContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user; 
        dispatch({type:"LOGIN", payload:user});
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <form data-testid="form" onSubmit={handleLogin}>
        <input
          id="email"
          type="email"
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="password" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" data-testid="submit" >Login</button>
        {error && <span>Wrong email or password!</span>}
        
        <div className="item">
            <DarkModeOutlinedIcon className="icon" 
            onClick={() => dispatch({ type: "TOGGLE" })} />
        </div>

        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>

          
      </form>
    </div>
    
  );
};

export default Login;