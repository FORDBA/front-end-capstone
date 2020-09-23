import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { RankProvider } from "./rank/RankProvider"
import { ProfessionProvider } from "./profession/ProfessionProvider"
import { UserProvider } from "./user/UserProvider"
import { RoleProvider } from "./role/RoleProvider"
import { ClassProvider } from "./class/ClassProvider"
import { RaceProvider } from "./race/RaceProvider"

export const Guild = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("guild_user")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        

       <RoleProvider>
           <ClassProvider>
               <RaceProvider>
       <RankProvider>
           <ProfessionProvider>
               <UserProvider>
                <Route path="/register" render={props => <Register {...props} />} />
                </UserProvider>
           </ProfessionProvider>
        </RankProvider>
               </RaceProvider>
           </ClassProvider>
       </RoleProvider>
        
    </>
)