import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import Master from './Master'
import * as Contacts from 'expo-contacts';
import { List } from 'react-native-paper';
import qrmAxios from '../qrmAxios';

export default function Settings() {
    const [contacts, setContacts] = useState([])
    const getContacts = () => {
        qrmAxios.get("safetycontacts/1/").then(response => {
            setContacts(response.data)
        })
    }
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.FirstName, Contacts.Fields.Name],
                });

                if (data.length > 0) {
                    // setContacts(data)
                }
            }
        })();
        getContacts()
    }, []);
    return (
        <Master title="Settings" subtitle='Set trusted contacts'>
            <FlatList data={contacts} renderItem={({ item }) => <List.Item title={item.contact_name} description={item.contact_phone} />} />
        </Master>
    )
}
