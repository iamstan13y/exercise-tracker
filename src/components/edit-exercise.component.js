import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.OnChangeUsername = this.OnChangeUsername.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.OnChangeDuration = this.OnChangeDuration.bind(this);
        this.OnChangeDate = this.OnChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    });
                }
            })
    }
    OnChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    OnChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    OnChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    OnChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return ( <
            div >
            <
            h3 > Edit Exercise < /h3> <
            form onSubmit = { this.onSubmit } >
            <
            div className = "form-group" >
            <
            label > Username: < /label> <
            select ref = "userInput"
            required className = "form-control"
            value = { this.state.username }
            onChange = { this.OnChangeUsername } > {
                this.state.users.map(function(user) {
                    return <option
                    key = { user }
                    value = { user } > { user } <
                        /option>;
                })
            } <
            /select> < /
            div > <
            div className = "form-group" >
            <
            label > Description: < /label> <
            input type = "text"
            required className = "form-control"
            value = { this.state.description }
            onChange = { this.OnChangeDescription }
            /> < /
            div > <
            div className = "form-group" >
            <
            label > Duration( in minutes): < /label> <
            input type = "text"
            required className = "form-control"
            value = { this.state.duration }
            onChange = { this.OnChangeDuration }
            /> < /
            div > <
            div className = "form-group" >
            <
            label > Date: < /label> <
            div >
            <
            DatePicker selected = { this.state.date }
            onChange = { this.onChangeDate }
            /> < /
            div > <
            /div> <
            br / >
            <
            div className = "form-group" >
            <
            input type = "submit"
            value = "Edit Log"
            className = "btn btn-primary" / >
            <
            /div> < /
            form > < /
            div >
        )
    }
}