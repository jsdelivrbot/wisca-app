import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchool, editSchool, fetchUsers } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const CLASSIFICATIONS = [ { display: 'AAAA', id: 'AAAA' }, { display: 'AAA', id: 'AAA' }, { display: 'AA', id: 'AA' } ];

const FIELDS = {
    'school' : { type: 'input', label: 'Name' },
    'coach1': { type: 'input', label: 'Head Coach (girls)' }
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
                    return ( <option key={value.id} value={value.id}>{value.display}</option> );
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

        const userlabels = _.values(users).map( value => {
            return { id: value.userid, display: `${value.name} (${value.affiliation})` }
        });

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h2>Edit School</h2>
                <Field name="school" type="input" component={ this.renderField } label="School"/>
                <Field name="size" type="select" component={ this.renderField } children={ CLASSIFICATIONS } label="Classification" />
                <Field name="coachid1" type="select" component={ this.renderField } label="Head Coach (girls)" children ={ userlabels }/>
                <Field name="coachid2" type="select" component={ this.renderField } label="Assistant Coach (girls)" children ={ userlabels }/>
                <Field name="coachid3" type="select" component={ this.renderField } label="Diving Coach (girls)" children ={ userlabels }/>
                <Field name="coachid4" type="select" component={ this.renderField } label="Head Coach (boys)" children ={ userlabels }/>
                <Field name="coachid5" type="select" component={ this.renderField } label="Assistant Coach (boys)" children ={ userlabels }/>
                <Field name="coachid6" type="select" component={ this.renderField } label="Diving Coach (boys)" children ={ userlabels }/>
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

