import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';
import "./style.css";

class List extends Component{
    state = {
        showForm: false,
        formValue: "",
        dueDate: ""
    };


    formSubmit = event => {
        const {formValue} = this.state.formValue;
        const {dueDate} = this.state.dueDate;
        const {addToDo} = this.props;
        event.preventDefault();
        addToDo({title:formValue}, {title:dueDate});
        this.setState({formValue: "", dueDate: ""});
    };

    renderForm = (event) => {
        const {showForm,formValue,dueDate} = this.state;
        if(showForm){
            return(
                <div id="todo-add-form" className="col s10 offset-s1">
                    <form onSubmit={this.formSubmit}>
                        <div className="input-field">
                            <input 
                                value={formValue}
                                onChange={this.setState({formValue: event.target.value})}
                                id="todoNext"
                                type="text"
                            />
                            <label htmlFor="todoNext">What Next?</label>
                            <input 
                                value={dueDate}
                                type="date-time-local"
                                placeholder="mm/dd/yyyy hh:mm:ss"
                                onChange={this.setState({dueDate: event.target.value})}
                            />
                        </div>
                    </form>
                </div>
            );
        }
    };

    renderToDo(){
        const {data} = this.props;
        const toDos = _.map(data, (value,reminder,key) => {
            return <ListItem key={key} todoId={key} todo={value,reminder} />;
        });
        if(!_.isEmpty(toDos)){
            return toDos;
        }
        return(
            <div className="col s10 offset-s1 center-align">
                <h4>Nothing ToDo!</h4>
            </div>
        );
    };

    componentWillMount(){
        this.props.fetchToDos();
    };

    render(){
        const {showForm} = this.state.showForm;
        return(
            <div className="App">
                <div className="title center-align" >
                    <h2>ToDo App</h2>
                </div>
                <div className="to-do-list-container">
                    <div className="row">
                        {this.renderForm(this.state)}
                        {this.renderToDo()}
                    </div>
                    <div className="fixed-action-btn">
                        <button
                            onClick={() => this.setState({showForm: !showForm})}
                            className="btn-floating btn-large black darken-4"
                        >
                            {showForm ? (
                                <i className="large material-icon">-</i>
                            ) : (
                                <i className="large material-icon">+</i>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({formValue, dueDate}) => {
    return{
        formValue,
        dueDate
    }
}

export default connect(mapStateToProps, actions)(List);