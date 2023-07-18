import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Box, Center, HStack, NativeBaseProvider, Pressable, VStack } from 'native-base';
import useAxios from './hooks/axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  },
};

export default function App() {
  const {
    results,
    next,
    previous,
    getPage
  } = useAxios({ baseURL: 'https://pokeapi.co/api/v2/pokemon' });
  console.log('results:', results);

  const renderItem = ({ name }, index) => (
    <Pressable w="40%" key={`pokemon-${index}`} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
    <Center
      bg={'primary.100'}
      m="2"
      p="2"
      rounded="xl"
      // w="40%"
    >
      {name}
    </Center>
    </Pressable>
  )

  return (
    <NativeBaseProvider config={config}>
      <Box
        safeArea
        h="100%"
        bg={{
          linearGradient: {
            colors: ['amber.700', 'primary.600'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Box
          bg={'primary.800'}
          p="5"
          rounded="xl"
          width="80%"
          margin="auto"
          _text={{
            fontSize: 'md',
            textAlign: 'center',
            fontWeight: 'medium',
            color: 'warmGray.50',
          }}
        >Pokemon List</Box>
        <VStack mt="3" space={3} alignItems="center">
          {/* <ScrollView> */}
            <HStack
              space={3}
              flexWrap="wrap"
              justifyContent="center"
            >

              {results ? results.map((pokemon, index) => renderItem(pokemon, index)): null}
              {/* <FlatList
                data={results}
                renderItem={({ item }) => <Item name={item.name} />}
              /> */}

            </HStack>
          {/* </ScrollView> */}
        </VStack>
        {
          previous &&
          <Button
            mb="2"
            title="Previous"
            onPress={() => getPage(previous)}
          />
        }
        <Button
          title="Next"
          onPress={() => getPage(next)}
        />
        <StatusBar style="auto" />
      </Box>
    </NativeBaseProvider>
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
});
