import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchools, fetchSchool, editSchool } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

const FIELDS = {
    'school' : { type: 'input', label: 'Name' },
    'size': { type: 'input', label: 'Classification' },
    'coach1': { type: 'input', label: 'Head Coach (girls)' }
}

class EditSchool extends React.Component {

    componentDidMount() {
        const { schoolid } = this.props.match.params;
        this.props.fetchSchool(schoolid);
        //this.props.initialize(this.props.school);
    }

    onSubmit(values) {
        this.props.editSchool(values, () => {
            this.props.history.push(`/schools/${this.props.school.classification}`);
        });
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={ className } >
                <label>{field.label}</label>
                <field.type s
                    className="form-control"
                    type="text" 
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {

        const { school, handleSubmit } = this.props;
        
        if (!school) {
            return <div>Loading...</div>;
        }

        const output = _.map(FIELDS, (value, key) => ({
            key, ...value
        }));

        console.dir(output);
        //this.props.initialize(school);
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h2>Edit School</h2>
                { _.each(output, (field, key) => {
/*
                    return (
                        <Field
                            label={ field.label }
                            key={ key }
                            type={ field.type }
                            name={ key }
                            component={ this.renderField }
                        />
                    );
*/
                })}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function mapStateToProps({ schools }, ownProps) {
    return { school: schools[ownProps.match.params.schoolid] };
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
    connect(mapStateToProps, { fetchSchool, editSchool })(EditSchool)
);

/*
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
    'title' : {
        type: 'input',
        label: 'Title'
    },
    'categories': {
        type: 'input',
        label: 'Enter some categories'
    },
    'content': {
        type: 'textarea',
        label: 'Post contents'
    }
}

class PostsNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={ className } >
                <label>{field.label}</label>
                <field.type
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {

        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                { Object.entries(FIELDS).map((obj, i) => {
                    return (
                        <Field
                            label={ obj[1].label }
                            type={ obj[1].type }
                            name={ obj[0] }
                            component={ this.renderField }
                        />
                    );
                })}
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }

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
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);

*/
