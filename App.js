import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

import { Card, CardItem, Button, Body } from 'native-base'
import Deck from './Screen/Deck.js'


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


export default class App extends React.Component {

  renderCard(item) {
    return (
      <Card>
        <CardItem>
          <Image source={{ uri: item.uri }} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem cardBody>
          <Body>
            <Text>{item.text}</Text>
            <Text>this is dummy item</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Button>
            <Text>View on</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }

  renderCard(item) {
    return (
      <Card>
        <CardItem cardBody>
          <Body>
            <Text>No More Card</Text>
            <Text>Click Below To Get More</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Button>
            <Text>Get More</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }

  onSwipeLeft() {
    return <View></View>
  }

  onSwipeRight() {
    return <View></View>
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
