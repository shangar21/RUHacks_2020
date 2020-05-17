import React from 'react';
import {View, Text, StyleSheet, Image, Linking, FlatList} from 'react-native';

import Button from '../Button';

const RecipeScreen = ({route, navigation}) => {
  const {recipe} = route.params;
  return (
    <>
      <View style={{backgroundColor: '#FFF'}}>
        <Image
          style={{
            width: '100%',
            height: 200,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          source={{uri: recipe.image}}
        />
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          }}>
          <Text style={styles.title}>{recipe.title}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={{paddingVertical: 10, width: '90%'}}>
            <Text style={styles.text}>
              {recipe.summary.replace(/<\/?[^>]+(>|$)/g, '')}
            </Text>
          </View>
          <View
            style={{paddingVertical: 10, width: '90%', flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.text}>
                Preperation Minutes: {recipe.preparationMinutes || '???'}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.text}>
                Cooking Minutes: {recipe.cookingMinutes || '???'}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.text}>
                Price per serving: ${recipe.pricePerServing || 'N/A'}
              </Text>
            </View>
          </View>
          <View style={{width: '90%'}}>
            <Text
              style={{
                ...styles.title,
                textAlign: 'center',
                fontSize: 20,
                paddingVertical: 10,
              }}>
              Ingredients:
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={recipe.extendedIngredients}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              key={item.id.toString()}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'black',
                marginVertical: 5,
                borderRadius: 10,
                padding: 10,
                backgroundColor: '#DDD',
              }}>
              <Text style={styles.text}>
                {item.amount} {item.unit} {item.originalName}
              </Text>
            </View>
          );
        }}
      />
      <View>
        <Button
          title={'Visit ' + recipe.sourceName}
          onPress={() => Linking.openURL(recipe.sourceUrl)}
          color="black"
          textColor="white"
          style={{borderRadius: 0}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
  },

  text: {
    color: 'black',
    fontSize: 15,
    textAlign: 'justify',
  },
});

export default RecipeScreen;
