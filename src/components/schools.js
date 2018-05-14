import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchools } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export const CLASSIFICATIONS = [ { id: 'AAAA', display: 'AAAA' }, { display: 'AAA', id: 'AAA' }, { key: 'AA', display: 'AA', id: 'AA' } ];

class Schools extends React.Component {

    componentDidMount() {
        const { classification } = this.props.match.params;
        this.props.fetchSchools(classification);
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(newProps) {
        const { classification } = newProps.match.params;
        if (classification != this.props.match.params.classification) {
            this.props.fetchSchools(classification);
        }
    }

    renderSchools() {
        return _.map(_.sortBy(this.props.schools, 'school'), school => {
            return (
                <li className='list-group-item' key={school.schoolid}>
                    <Link to={`/school/${school.schoolid}`}>
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
                <h2>Schools</h2>
                <h4>
                    {[{id: 'all', display: 'All'}, ...CLASSIFICATIONS].map(classification => {
                        return (
                            <span key={classification.id}>
                                {classification.id == 'all' ? '' : ' | '} 
                                {classification.id != this.props.match.params.classification ? 
                                    <Link to={`/schools/${classification.id}`}>{classification.display}</Link> :
                                    classification.display}
                            </span>
                        );
                    })}
                </h4>
                <ul  key={this.props.match.params.classification} className="list-group">
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