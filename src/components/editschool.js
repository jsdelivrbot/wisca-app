import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchool, editSchool, fetchUsers } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const CLASSIFICATIONS = [ { display: 'AAAA', id: 'AAAA' }, { display: 'AAA', id: 'AAA' }, { display: 'AA', id: 'AA' } ];

const FIELDS = {
    'school' : { type: 'input', label: 'Name' },
    'size' : { type: 'input', label: 'Classification' },
    'coachid1': { type: 'input', label: 'Head Coach (girls)' },
    'coachid2': { type: 'input', label: 'Assistant Coach (girls)' },
    'coachid3': { type: 'input', label: 'Diving Coach (girls)' },
    'coachid4': { type: 'input', label: 'Head Coach (boys)' },
    'coachid5': { type: 'input', label: 'Assistant Coach (girls)' },
    'coachid6': { type: 'input', label: 'Diving Coach (girls)' }
};

class EditSchool extends React.Component {

    componentDidMount() {
        const { schoolid } = this.props.match.params;
        this.props.fetchSchool(schoolid);
        this.props.fetchUsers();
    }

    onSubmit(values) {
        this.props.editSchool(values, () => {
            this.props.history.push(`/schools/${this.props.school.classification}`);
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
        const { school, handleSubmit, users } = this.props;
        if (!school || !users) {
            return <div>Loading...</div>;
        }

        let userlabels = _.values(users).map( value => {
            return { id: value.userid, display: `${value.name} (${value.affiliation})` }
        });

        //this enables all lists have a default setting
        const empty = { id: null, display: ' -- select an option -- ',  disabled: 'disabled'};
        userlabels.unshift(empty);

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
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to={`/schools/${school.size}`} className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { schools, users } = state;
    let obj = {};
    if (schools) {
        obj = { school: schools[ownProps.match.params.schoolid] };
    }
    if (users) {
        obj = { ...obj, users : users };
    }
    return obj;
}

function validate(values) {
    const errors = {};
    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter ${field}`;
        }
    })
    return errors;
}

export default reduxForm({
    validate,
    fields: _.keys(FIELDS),
    form: 'SchoolForm'
})(
    connect(mapStateToProps, { fetchSchool, editSchool, fetchUsers })(EditSchool)
);

