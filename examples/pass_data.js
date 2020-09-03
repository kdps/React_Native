# Parent

this.props.navigation.navigate('NavigationName', {
  callback: () => {
    alert("Hello from parent stack");    
  },
});

# Child
componentDidMount() {
  this.props.navigation.state.params.callback();
}
