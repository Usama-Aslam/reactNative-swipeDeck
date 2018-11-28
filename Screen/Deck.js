import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_DURATION = 250;

class Deck extends Component {
    static defaultProps = {
        onSwipeLeft: () => { },
        onSwipeLeft: () => { }
    }

    constructor(props) {
        super(props)

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right')
                }
                else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left')
                }
                else {
                    this.positionReset()
                }
            }
        });

        this.state = {
            panResponder,
            position,
            index: 0
        }
    }

    forceSwipe(direction) {
        const { position } = this.state
        let width = direction == 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH

        Animated.timing(position, {
            toValue: { x: width, y: 0 },
            duration: SWIPE_DURATION
        }).start(() => this.onSwipeComplete(direction))
    }


    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props
        const { index } = this.state

        const item = data[index];

        direction == 'left' ? onSwipeLeft(item) : onSwipeRight(item)

        this.state.position.setValue({ x: 0, y: 0 })

        this.setState({
            index: index + 1
        })

    }

    positionReset() {
        const { position } = this.state

        Animated.spring(position, {
            toValue: { x: 0, y: 0 }
        }).start()
    }

    getCardStyle() {
        const { position } = this.state;

        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards() {
        if (this.state.index > this.props.data.length) {
            return this.props.renderNoMoreCard()
        }
        return this.props.data.map((item, i) => {
            if (i < this.state.index) {
                return null
            }

            if (i == this.state.index) {
                return <Animated.View
                    key={item.id}
                    {...this.state.panResponder.panHandlers}
                    style={this.getCardStyle}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            }

            return this.props.renderCard(item)
        })
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;