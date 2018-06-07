import * as React from "react";
import { connect } from "react-redux";

import AddToDoItemModal from "../../components/todo/add-item-modal"

import {
    Button,
    Well,
    ListGroup,
    DropdownButton,
    MenuItem,
    Glyphicon,
} from "react-bootstrap";
import Msg from "../../config/messages";
import {fire} from "../../utils/fire";
import {setItems} from "../../modules/items";
import { loading } from "../../modules/loading";
import {bindActionCreators} from "redux";
import ToDoItem from "../../components/todo/item";
import { checkToDoFilters } from "../../utils/common";

class ToDoWrapper extends React.Component {

    $toDoItemsRef = null;

    constructor(props) {
        super(props);

        this.state = {
            addItemModal: false,
            listItemsMode: 0,
        };

        this.$toDoItemsRef = fire.database().ref(`items/${this.props.currentUser.uid}`);

        this.props.loading(true);

        this.$toDoItemsRef.on('value', data => {
            this.props.setItems({
                items: data.val(),
            });

            this.props.loading(false);

            console.log("Items received:", data.val());
        });

        this.addItemModalToggle = this.addItemModalToggle.bind(this);
        this.addItemHandler = this.addItemHandler.bind(this);
        this.completeItemHandler = this.completeItemHandler.bind(this);
        this.deleteItemHandler = this.deleteItemHandler.bind(this);
        this.processToDoItems = this.processToDoItems.bind(this);
    }

    addItemModalToggle() {
        this.setState({
            addItemModal: !this.state.addItemModal,
        })
    }

    addItemHandler({text, dueDate}) {
        this.props.loading(true);

        this.$toDoItemsRef.push({
            item: text,
            dueDate: dueDate.format(),
            completed: false,
        });

        this.setState({
            addItemModal: false,
        });
    }

    completeItemHandler(id) {
        this.$toDoItemsRef.update({
            [id]: {
                ...this.props.toDoItems[id],
                completed: true,
            }
        })
        .then(() => {
            this.props.loading(false);
        });

        this.props.loading(true);
    }

    deleteItemHandler(id) {
        this.$toDoItemsRef.update({
            [id]: null,
        })
        .then(() => {
            this.props.loading(false);
        });

        this.props.loading(true);
    }

    processHeader(appLoading) {
        const style = {
            flex: 1,
        };

        if (appLoading) {
            return <h3 style={style}>{Msg.appLoading}</h3>;
        } else {
            return this.props.toDoItems
                ? <h3 style={style}>THERE ARE SOME ITEMS</h3>
                : <h3 style={style}>THERE IS NO ITEMS</h3>;
        }
    }

    processToDoItems(listMode) {
        let mark;
        const items = this.props.toDoItems;
        const itemsList = [];

        if (listMode === 0) {
            mark = '\u2713';
        } else if (listMode === 1) {
            mark = 'x'
        } else {
            mark = "";
        }

        for (let i in items) {
                if (items.hasOwnProperty(i) && checkToDoFilters(this.state.listItemsMode, items[i].completed)) {
                    const toDoElem = items[i];

                    itemsList.push(
                        <ToDoItem
                            key={i}
                            itemId={i}
                            item={toDoElem.item}
                            dueDate={toDoElem.dueDate}
                            action={toDoElem.completed ? this.deleteItemHandler : this.completeItemHandler}
                            mark={mark}
                        />
                    )
                }
            }

        return (
            <ListGroup>
                {itemsList}
            </ListGroup>
        )
    }

    filtersHandler(listMode) {
        this.setState({
            ...this.state,
            listItemsMode: listMode,
        });
    }

    render() {
        console.log("State:", this.state);

        return (
            <Well>
                <div className="flex">
                    {this.processHeader(this.props.appLoading)}
                    <DropdownButton
                        bsStyle="primary"
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <Glyphicon glyph="filter" /> Filters{' '}
                            </div>
                        }
                        id="todo-filters"
                    >
                        <MenuItem
                            eventKey="0"
                            onClick={() => this.filtersHandler(0)}
                        >
                            Incompleted
                        </MenuItem>
                        <MenuItem
                            eventKey="1"
                            onClick={() => this.filtersHandler(1)}
                        >
                            Completed
                        </MenuItem>
                        <MenuItem
                            eventKey="2"
                            onClick={() => this.filtersHandler(2)}
                        >
                            All items
                        </MenuItem>
                    </DropdownButton>
                </div>
                <AddToDoItemModal
                    showModal={this.state.addItemModal}
                    modalToggleHandler={this.addItemModalToggle}
                    addItemHandler={this.addItemHandler}
                />
                {this.props.toDoItems && this.processToDoItems(this.state.listItemsMode)}
                <Button
                    bsStyle="primary"
                    onClick={this.addItemModalToggle}
                >
                    {Msg.todo.addNewItemBtn}
                </Button>
            </Well>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setItems,
    loading,
}, dispatch);

const mapStateToProps = state => ({
    toDoItems: state.items.toDoItems,
    appLoading: state.loading,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ToDoWrapper);