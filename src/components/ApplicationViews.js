import React from "react"
import { Route } from "react-router-dom"
import { Profile } from "./user/Profile"
import { UserProvider } from "./user/UserProvider"
import { UserProfessionProvider } from "./profession/UserProfessionProvider"
import { ProfessionForm } from "./profession/ProfessionForm"
import { ProfessionProvider } from "./profession/ProfessionProvider"
import { UserList } from "./user/UserList"
import { UserDetails } from "./user/UserDetails"


export const ApplicationViews = (props) => {
    return (
        <>
             <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("guild_user")
                    props.history.push("/login")
                }
            } />


               <UserProvider>
                   <ProfessionProvider>

                <UserProfessionProvider>

                <Route  exact path="/profile" render={(props) => {
                            return <>
                               
                                <Profile history={props.history} />
                            </>
                        }} />
           

                <Route  path="/profile/createprofs" render={(props) => {
                            return <ProfessionForm {...props} />
                        }} />
                </UserProfessionProvider>
                   </ProfessionProvider>
               </UserProvider>
            

               <UserProvider>
                   <ProfessionProvider>

                <UserProfessionProvider>

                <Route  exact path="/members" render={(props) => {
                            return <>
                               
                                <UserList history={props.history} />
                            </>
                        }} />
           

           <Route path="/members/:userId(\d+)" render={
                            props => <UserDetails {...props} />
                        } />
                </UserProfessionProvider>
                   </ProfessionProvider>
               </UserProvider>
            
        </>
    )
}