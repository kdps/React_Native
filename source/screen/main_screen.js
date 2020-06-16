import React from 'react';
import {NavigationActions} from 'react-navigation';
import {View, Text, Image} from 'react-native';

type Props = {};
export default class IntroScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    
    this.state = {}; // Initialize State
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
