import React from 'react';
import {NavigationActions} from 'react-navigation';
import {View, Text, Image} from 'react-native';

type Props = {};
export default class IntroScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    
    this.state = {
      requestBody: {
      },
    }; // Initialize State
  }
  
  requestPOST = async() => {
    const requestURL = "http://www.website.com";
  
    const requestHeaders = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: this.state.requestBody,
    };

    return fetch(requestURL, requestHeaders)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              
            });
          };
  }
  
  requestGET = async() => {
    const requestURL = "http://www.website.com";
                
    const requestHeaders = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    };

    return fetch(requestURL, requestHeaders)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              
            });
          };
  }
  
  static getDerivedStateFromProps(props, state) {
      return null;
  }
                
  componentWillMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidCatch(error, info) {}
  
  componentDidUpdate(prevProps, prevState, snapshot) {}
  
  componentDidMount() {}

  shouldComponentUpdate(nextProps, nextState) {}
  
  render() {
    if (this.state.hasError) {
      return (
        <View><Text>Avoid</Text><View>
      )
    } else {
      return (
        <View><Text>Success</Text><View>
      )
    }
  }
}

const styles = StyleSheet.create({
});
