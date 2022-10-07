import {React , useEffect , useState} from "react";
import { Drawer,Login } from "./components";
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import db from "./lib/firebase";
import { IsUserRedirect,ProtectedRoute } from "./routes/Routes";
import { useLocalContext } from "./context/context";
import { JoinedClasses } from "./components";
import { Main } from "./components";
import BasicTabs from "./components/Assign/Assign";


function App() {
  const {loggedInMail, loggedInUser} = useLocalContext()
  const [createdClass, setCreatedClass] = useState([])
  const [joinedClass, setJoinedClass] = useState([])
  useEffect(() => {
      if(loggedInMail)
      {
        let unsubscribe = db.collection("Created Classes").doc(loggedInMail).collection("Classes").onSnapshot((snap) => {
          setCreatedClass(snap.docs.map((doc) => doc.data()))
        })
        return () => unsubscribe();
      }

     
    }
  , [loggedInMail])

console.log(createdClass)
    useEffect(() => {

      if(loggedInMail)
      {
        let unsubscribe = db.collection("Joined Classes").doc(loggedInMail).collection("Classes").onSnapshot((snap) =>
        {
         setJoinedClass(snap.docs.map((doc) => doc.data().joinedData)) 
        }  )

        return () => unsubscribe();
      }

  

    },[loggedInMail])

    console.log(joinedClass)
  return (

    <Router>

      <Switch>
        
       {createdClass.map((item,index) => (
          <Route key = {index}  exact path = {`/${item.id}`}>
          <Drawer />
          
          <Main classData = {item} />
          

       </Route>
       )
        
       )}

    {joinedClass.map((item,index) => (
          <Route key = {index}  exact path = {`/${item.id}`}>
          <Drawer />
          <BasicTabs classData = {item}/>
          

       </Route>
       )
        
       )}
            
      
     
      <IsUserRedirect
          user={loggedInMail}
          loggedInPath="/"
          path="/signin"
          exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer />
          <ol className = "joined">

          {createdClass.map((item) => <JoinedClasses classData = {item} /> )}

          {joinedClass.map((item) => <JoinedClasses classData = {item} /> )}

        

          

          </ol>
        </ProtectedRoute>
         
      </Switch>
    </Router>
  );
}

export default App;
