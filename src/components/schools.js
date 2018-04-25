import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchools } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Schools extends React.Component {

    componentDidMount() {
        const { classification } = this.props.match.params;
        this.props.fetchSchools(classification);
    }

    renderSchools() {
        return _.map(_.sortBy(this.props.schools, 'school'), school => {
            return (
                <li className='list-group-item' key={school.schoolid}>
                    <Link to={`/schools/${school.schoolid}`}>
                        {school.school}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right"> 
                    <Link className="btn btn-primary" to="/schools/new">
                        Add a School
                    </Link>
                </div>
                <h3>Schools</h3>
                <ul className="list-group">
                    { this.renderSchools() } 
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { schools: state.schools };
}

export default connect(mapStateToProps, { fetchSchools })(Schools);