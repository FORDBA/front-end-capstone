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
import { Register } from "./auth/Register"
import { RankProvider } from "./rank/RankProvider"
import { RoleProvider } from "./role/RoleProvider"
import { ClassProvider } from "./class/ClassProvider"
import { RaceProvider } from "./race/RaceProvider"
import { TreasureForm } from "./Loot/TreasureForm"
import { TreasureProvider } from "./Loot/TreasureProvider"
import { AttendingEventProvider } from "./Events/AttendingEventsProvider"
import { CommentProvider } from "./Comments/CommentProvider"
import { NeededBossList } from "./Bosses/NeededBossesList"
import { UserProfessionList } from "./profession/UserProfessionList"
import { TreasureList } from "./Loot/TreasureList"
import { UserSearch } from "./user/UserSearch"
 

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
                            <RankProvider>
                            <RoleProvider>
                                <ClassProvider>
                                    <RaceProvider>
                                        <TreasureProvider>
                    <UserProfessionProvider>

                        <Route exact path="/profile" render={(props) => {
                            return <>

                                <Profile history={props.history} />
                                <UserProfessionList />
                                <NeededBossList history={props.history} />
                                <TreasureList history={props.history}/>

                

            
                            </>
                        }} />
                        <Route path="/profile/edit/:userId(\d+)" render={
                            props => <Register {...props} />
                        } />


                        <Route path="/profile/createprofs" render={(props) => {
                            return <ProfessionForm {...props} />
                        }} />
                        <Route path="/profile/createloot" render={(props) => {
                            return <TreasureForm {...props} />
                        }} />

                        <Route path="/profile/createbossesneeded" render={(props) => {
                            return <NeededBossesForm {...props} />
                        }} />
                        
                    </UserProfessionProvider>
                    </TreasureProvider>
                    </RaceProvider>
                    </ClassProvider>
                    </RoleProvider>
                    </RankProvider>
                    </NeededBossProvider>
                    </BossProvider>
                </ProfessionProvider>
            </UserProvider>


            <UserProvider>
                <ProfessionProvider>

                    <UserProfessionProvider>
                        <BossProvider>
                            <NeededBossProvider>
                                <TreasureProvider>
                                    <RankProvider>

                        <Route exact path="/members" render={(props) => {
                            return <>
                                <UserSearch />
                                <UserList history={props.history} />
                            </>
                        }} />


                        <Route path="/members/:userId(\d+)" render={
                            props => <UserDetails {...props} />
                        } />
                        </RankProvider>
                        </TreasureProvider>
                        </NeededBossProvider>
                        </BossProvider>
                    </UserProfessionProvider>
                </ProfessionProvider>
            </UserProvider>


            <DungeonProvider>
            <BossProvider>
                <UserProvider>
                <CommentProvider>
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
                        <Route path="/bosses/edit/:bossId(\d+)" render={
                            props => <BossForm {...props} />
                        } />
             </CommentProvider>           
             </UserProvider>
            </BossProvider>
            </DungeonProvider>

            <UserProvider>
                <EventProvider>
                    <AttendingEventProvider>
                        <DungeonProvider>
                            <BossProvider>
                                <NeededBossProvider>
                                    <TreasureProvider>
                    

                        <Route exact path="/events" render={(props) => {
                            return <>

                                <EventList history={props.history} />
                            </>
                        }} />
                        <Route path="/events/createevent" render={(props) => {
                            return <EventForm {...props} />
                        }} />


                        <Route path="/events/:eventId(\d+)" render={
                            props => <EventDetails {...props} />
                        } />
                         <Route path="/events/edit/:eventId(\d+)" render={
                            props => <EventForm {...props} />
                        } />
                        </TreasureProvider>
                        </NeededBossProvider>
                        </BossProvider>
                        </DungeonProvider>
                        </AttendingEventProvider>
                    
                </EventProvider>
            </UserProvider>

        </>
    )
}