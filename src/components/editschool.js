import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchool, editSchool, fetchUsers, fetchAthletes, fetchSchools } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { CLASSIFICATIONS } from './schools';

//export const CLASSIFICATIONS = [ { display: 'AAAA', id: 'AAAA' }, { display: 'AAA', id: 'AAA' }, { display: 'AA', id: 'AA' } ];

const FIELDS = {
    'school' : { type: 'input', label: 'Name', required: true },
    'size' : { type: 'input', label: 'Classification', required: true },
    'coachid1': { type: 'input', label: 'Head Coach (girls)' },
    'coachid2': { type: 'input', label: 'Assistant Coach (girls)' },
    'coachid3': { type: 'input', label: 'Diving Coach (girls)' },
    'coachid4': { type: 'input', label: 'Head Coach (boys)' },
    'coachid5': { type: 'input', label: 'Assistant Coach (girls)' },
    'coachid6': { type: 'input', label: 'Diving Coach (girls)' },
    'assign': { type: 'input', label: 'Assign to' }
};

class EditSchool extends React.Component {

    componentDidMount() {
        const { schoolid } = this.props.match.params;
        this.props.fetchUsers();
        this.props.fetchAthletes(schoolid);
        this.props.fetchSchools('all');
        this.props.fetchSchool(schoolid);
        window.scrollTo(0, 0);
    }

    onSubmit(values) {
        const {editSchool, school} = this.props;
        editSchool(school.schoolid, values, () => {
            this.props.history.push(`/schools/${values.size}`);
        });
    }

    renderField(field) {
        const { children, meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={ className } >
                <label>{field.label}</label>
                <field.type
                    className="form-control"
                    {...field.input}
                >
                {children && !_.isEmpty(children) && children.map((value) => {
                    return ( <option key={value.id} value={value.id} disabled={value.disabled}>{value.display}</option> );
                })}
                </field.type>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    componentWillReceiveProps(newProps) {
        if (newProps.pristine) {
            this.props.initialize(newProps.school);
        }
    }

    render() {
        const { school, handleSubmit, users, athletes, schools } = this.props;
        if (!school || !users || !athletes || !schools) {
            return <div>Loading...</div>;
        }

        const userlabels = _.values(users).map( value => {
            return { id: value.userid, display: `${value.name} (${value.affiliation})` }
        });
        //enables all lists have a default setting
        userlabels.unshift({ id: -1, display: ' -- no coach selected -- '});

        const schoolarray = _.map(_.sortBy(schools, ['school', 'size']), value => {
            return { id: value.schoolid, display: `${value.school} (${value.size})` }
        });
        schoolarray.unshift({ id: null, display: ' -- assign to another school -- '});

        //coach dropdowns are all formatted the same
        const coaches = _.keys(FIELDS).filter(coach => {
            return (coach.startsWith('coach'));
        })
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h2>Edit School</h2>
                <Field name="school" type="input" component={ this.renderField } label={FIELDS["school"].label} />
                <Field name="size" type="select" component={ this.renderField } children={ CLASSIFICATIONS } label={FIELDS["size"].label} />
                {coaches.map(coach => {
                    return (
                        <Field key={coach} name={coach} type="select" component={ this.renderField } label={FIELDS[coach].label} children ={ userlabels }/>
                    );
                })}
                <Field name="assign" type="select" component={ this.renderField } children={ schoolarray } label={FIELDS["assign"].label} />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={`/schools/${school.size}`} className="btn btn-danger">Cancel</Link>
                <div className="athlete-list">
                    <h4>Current qualifiers</h4>
                    <ul className="list-group">
                        { this.renderAthletes() } 
                    </ul>
                </div>
            </form>
        );
    }

    renderAthletes() {
        return _.map(_.sortBy(this.props.athletes, ['gradyear', 'lastname']), athlete => {
            return (
                <li className='list-group-item' key={athlete.athleteid}>{athlete.firstname} {athlete.lastname} - {athlete.gradyear}</li>
            );
        });
    }

}

function mapStateToProps(state, ownProps) {
    const { schools, users, athletes } = state;
    return { school: schools[ownProps.match.params.schoolid], users, athletes, schools };
}

function validate(values) {
    const errors = {};
    _.each(FIELDS, (value, field) => {
        if (value.required && !values[field]) {
            errors[field] = `Enter ${field}`;
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    fields: _.keys(FIELDS),
    form: 'SchoolForm'
})(
    connect(mapStateToProps, { fetchSchool, editSchool, fetchUsers, fetchAthletes, fetchSchools })(EditSchool)
);

