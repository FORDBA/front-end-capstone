import React from "react"
import { Route } from "react-router-dom"
import { Profile } from "./user/Profile"
import { UserProvider } from "./user/UserProvider"
import { UserProfessionProvider } from "./profession/UserProfessionProvider"
import { ProfessionForm } from "./profession/ProfessionForm"
import { ProfessionProvider } from "./profession/ProfessionProvider"
import { UserList } from "./user/UserList"
import { UserDetails } from "./user/UserDetails"
import { BossProvider } from "./Bosses/BossProvider"
import { NeededBossProvider } from "./Bosses/NeededBossProvider"
import { NeededBossesForm } from "./Bosses/NeededBossesForm"
import { BossList } from "./Bosses/BossList"
import { DungeonProvider } from "./Dungeons/DungeonProvider"
import { BossForm } from "./Bosses/BossForm"
import { BossDetails } from "./Bosses/BossDetails"
import { EventList } from "./Events/EventList"
import { EventProvider } from "./Events/EventProvider"
import { EventDetails } from "./Events/EventDetails"
import { EventForm } from "./Events/EventForm"


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
                    <BossProvider>
                        <NeededBossProvider>

                    <UserProfessionProvider>

                        <Route exact path="/profile" render={(props) => {
                            return <>

                                <Profile history={props.history} />
                            </>
                        }} />


                        <Route path="/profile/createprofs" render={(props) => {
                            return <ProfessionForm {...props} />
                        }} />

                        <Route path="/profile/createbossesneeded" render={(props) => {
                            return <NeededBossesForm {...props} />
                        }} />
                    </UserProfessionProvider>
                    </NeededBossProvider>
                    </BossProvider>
                </ProfessionProvider>
            </UserProvider>


            <UserProvider>
                <ProfessionProvider>

                    <UserProfessionProvider>

                        <Route exact path="/members" render={(props) => {
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


            <DungeonProvider>
            <BossProvider>
                <Route exact path="/bosses" render={(props) => {
                            return <>

                                <BossList history={props.history} />
                            </>
                        }} />
                        <Route path="/bosses/createboss" render={(props) => {
                            return <BossForm {...props} />
                        }} />
                        <Route path="/bosses/:bossId(\d+)" render={
                            props => <BossDetails {...props} />
                        } />

            </BossProvider>
            </DungeonProvider>

            <UserProvider>
                <EventProvider>

                    

                        <Route exact path="/events" render={(props) => {
                            return <>

                                <EventList history={props.history} />
                            </>
                        }} />
                        <Route path="/events/createevent" render={(props) => {
                            return <EventForm {...props} />
                        }} />


                        <Route path="/members/:eventId(\d+)" render={
                            props => <EventDetails {...props} />
                        } />
                    
                </EventProvider>
            </UserProvider>

        </>
    )
}