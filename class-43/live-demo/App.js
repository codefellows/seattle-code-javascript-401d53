import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

const call = (contact) => {
  // console.log('from the call function....', contact);
  let phoneNumber = contact.phoneNumbers[0].number;
  // console.log('phoneNumber:', phoneNumber);
  const link = `tel:${phoneNumber}`
  // console.log('link:', link);
  Linking.canOpenURL(link)
    .then(supported => Linking.openURL(link))
    .catch(e => console.error(e));
}

const Item = ({ item }) => (
  <View style={styles.item}>
    <Button 
      onPress={() => call(item)}
      title={item.name}
    />
  </View>
);

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async() => {
      const { status } = await Contacts.requestPermissionsAsync();
      // console.log('status-------', status);
      if (status === 'granted'){ 
      const { data } =  await Contacts.getContactsAsync();
        console.log('this is my data', data[0].name);
        setContacts(data)
      }
    }
    getContacts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Contacts!</Text>
      <FlatList 
        data={contacts}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
      {/* {
        contacts.map((contact, index) => (
          <Text key={`contacts-${index}`}>{contact.name}</Text>
        ))
      } */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  item: {
    backgroundColor: '#401d53',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color:'#fff',
    fontSize: 32,
  },
});
