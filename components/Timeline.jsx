import React, { useEffect, useState } from 'react'
import { View, Text, RefreshControl } from 'react-native'
import Master from './Master'
import Timeline from 'react-native-timeline-flatlist'
import qrmAxios from '../qrmAxios'
import { List, useTheme } from 'react-native-paper'

export default function Timelines() {
    const [atimeline, setaTimeline] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const theme = useTheme()
    const getTimeline = () => {
        setIsRefreshing(true)
        qrmAxios.get("/usertimeline/1/").then(response => {
            setaTimeline(response.data.map(e => {
                return {
                    time: new Date(e.time).toLocaleTimeString(),
                    title: e.position.name,
                }
            }))
        }).then(()=>{
            setIsRefreshing(false)
        })
    }
    useEffect(() => {
        getTimeline()
    }, [])
    return (
        <Master title="Timeline" subtitle='Current Activities'>
            <List.Item 
            title="Shared with your contacts" 
            style={{backgroundColor:'#eaeaea'}} 
            left={props=><List.Icon icon='account-group' />}
            right={props=><List.Icon icon='chevron-right' />}
             />
            <Timeline data={atimeline} circleSize={15}
                options={{
                  refreshControl:(
                      <RefreshControl refreshing={isRefreshing} onRefresh={getTimeline} />
                  )  
                }}
                innerCircle='dot'
                style={{ paddingLeft: 10, paddingRight: 10 }}
                lineColor='orangered'
                circleColor={theme.colors.primary}
                separator={true} />
        </Master>
    )
}
