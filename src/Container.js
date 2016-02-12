import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const style = {
    width: 400
};

class Container extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.state = {
            cards: [{
                id: 1,
                text: 'Lemon drops biscuit sesame snaps tootsie roll tiramisu.'
            }, {
                id: 2,
                text: 'Wafer candy canes oat cake jujubes chocolate chocolate bar sesame snaps.'
            }, {
                id: 3,
                text: 'Chocolate cake dessert macaroon.'
            }, {
                id: 4,
                text: 'Carrot cake bear claw chupa chups gummi bears cupcake lemon drops sweet.'
            }, {
                id: 5,
                text: 'Pie dessert cake powder chocolate cake chocolate bar bonbon. Sesame snaps tart tiramisu bear claw donut donut chocolate bar tart. Toffee chocolate jelly beans sugar plum candy tiramisu candy.'
            }]
        };
    }
    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }));
    }
    render() {
        const { cards } = this.state;

        return (
            <div style={style}>
                {cards.map((card, i) => {
                    return (
                        <Card key={card.id}
                              index={i}
                              id={card.id}
                              text={card.text}
                              moveCard={this.moveCard}
                        />
                    )
                })}
            </div>
        )
    };
}

export default DragDropContext(HTML5Backend)(Container);