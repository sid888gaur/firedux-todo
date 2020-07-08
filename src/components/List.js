import React, {Component} from 'react';

class List extends Component{
    state = {
        showForm: false,
        formValue: ""
    };

    inputChange = event => {
        this.setState({formValue: event.target.value});
    };

    formSubmit = event => {
        const {formValue} = this.state;
        const {addToDo} = this.props;
        event.preventDefault();
        addToDo({title:formValue});
        this.setState({formValue: ""});
    };

    renderForm = () => {
        const {showForm,formValue} = this.state;
        if(showForm){
            return(
                <div id="todo-add-form" className="col s10 offset-s1">
                    <form onSubmit={this.formSubmit}>
                        <div className="input-field">
                            <input 
                                value={formValue}
                                onChange={this.inputChange}
                                id="todoNext"
                                type="text"
                            />
                            <label htmlFor="todoNext">What Next?</label>
                        </div>
                    </form>
                </div>
            );
        }
    };

    render(){
        const {showForm} = this.state;
        return(
            <div className="to-do-list-container">
                <div className="row">
                    {this.renderForm()}
                    {this.renderToDo()}
                </div>
            </div>
        );
    }
}