import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuotes } from '../redux/ActionCreators';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {QUOTES} from '../shared/quotes';

const mapDispatchToProps = {
    fetchQuotes: () => (fetchQuotes())
};

const mapStateToProps = state => {
    return {
        quotes: state.quotes
    };
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: QUOTES
        };
    }
    
    componentDidMount() {
        this.props.fetchQuotes();
    }

    render() {
        const HomePage = () => {
            return (
                <Home 
                //quote will need to eventually be filtered by selected date...
                //but for now I'm selecting only first quote to demo that it shows up.
                quote = {this.props.quotes.quotes.filter(quote => quote.date === "2001-01-01T08:00:00.000Z")[0]}
                />
            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/about' component={About} />
                    <Route path='/contact' component={Contact} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));