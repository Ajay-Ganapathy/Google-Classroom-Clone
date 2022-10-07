import { createContext } from "react";
import { useState, useEffect} from "react";
import { useContext } from "react";
import {auth, provider} from "../lib/firebase"

const AddContext = createContext()

export function useLocalContext()
{
  return useContext(AddContext)
}

export function ContextProvider({children})
{
  const [createClassForm,setCreateClassForm] = useState(false);
  const [joinClassForm,setJoinClassForm] = useState(false);
  const [loggedInUser , setLoggedInUser] = useState(null);
  const [loggedInMail , setLoggedInMail] = useState(null);
  const login = () => {
    auth.signInWithPopup(provider)
  }

  const logout = () => {
    auth.signOut()
  }

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        if(authUser)
        {
          setLoggedInUser(authUser);
          setLoggedInMail(authUser.email);
        }
        else{
          setLoggedInMail(null);
          setLoggedInUser(null);
        }
      }

      
    )

    return () => {
      unsubscribe()
    }
  },[])
  const value = {createClassForm,setCreateClassForm,joinClassForm,setJoinClassForm,loggedInUser , setLoggedInUser,loggedInMail , setLoggedInMail,login,logout};
  return <AddContext.Provider value = {value} >{children}</AddContext.Provider>
}