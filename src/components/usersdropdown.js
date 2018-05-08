import React, { Component } from 'react';
import { fetchSchools } from '../actions';
import _ from 'lodash';

class UsersDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = { classification: '' };
    }

    render() {
        return (
            <div className="search-bar">
                <input 
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value) } />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}