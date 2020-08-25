import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

//Created By: Ashish Ranjan
//Uses: autocomplete text view component for react native
//Props: Go to AutoComplete.propTypes for props

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this.displaySuggestion, 500);
    this.state = {
      selectedId: null,
      selectedValue: null,
      dataSource: [],
    };
    this.sugestionsListPos = {};
    this.elementHeight = null;
    this.elementPosition = null;
    this.primaryString = null;
    this.store = [];
    this.keyboardPos = Dimensions.get('screen').height;
    this.showSuggestions = false;
    this.measure = false;
  }

  // register events on keyboardDidShow and keyboardDidHide

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  // deregister events on keyboardDidShow and keyboardDidHide

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //when keyboard appears disbale scroll of parent component and pass it to the autocomplete component
  _keyboardDidShow(e) {
    this.keyboardPos = e.endCoordinates.screenY;
    this.showSuggestions = true;
    this.props.parentEndScroll();
  }

  //when keyboard hides disable scroll of autocomplete and pass it back to parent component
  _keyboardDidHide() {
    this.measure = false;
    this.keyboardPos = Dimensions.get('screen').height;
    this.showSuggestions = false;
    this.props.parentStartScroll();
  }

  //triggers at minimum of two characters
  //if the previous text was substring of new text filter from the previous list else filter from main list
  getDataLogic = (str) => {
    if (str.length > 0) {
      let dataSource = [];

      let requiredData = this.props.data.filter((itm) =>
        new RegExp(str.toLowerCase()).test(itm.Name.toLowerCase()),
      );

      dataSource = requiredData;

      this.setState({dataSource});

      if (!dataSource.length) {
        //NativeModulesCall(ToastAndroid.show)(
        //  'DATA NOT EXISTS',
        //  ToastAndroid.SHORT,
        //);
      }
    } else {
      this.primaryString = null;
      this.store = [];
      this.setState({dataSource: []});
    }
  };

  //on clicking of one of the suggestion
  onSuggestionSelect = (id, value) => {
    this.props.onSelect(id);
    this.setState({selectedId: id, selectedValue: value});
  };

  //on press of cross button reset
  onSuggestionDeselect = () => {
    this.primaryString = null;
    this.store = [];
    this.props.onSelect(null);
    this.setState({selectedId: null, selectedValue: null, dataSource: []});
  };

  //measure position of element and display suggestions
  displaySuggestion = (str) => {
    if (!this.measure) {
      this.measure = true;
      if (!this.myComponent) {
        return false;
      }
      this.myComponent.measure((fx, fy, width, height, px, py) => {
        this.elementHeight = height;
        this.elementPosition = py;
        let spaceAboveElement = this.elementPosition;
        let spaceBelowElement =
          this.keyboardPos - (this.elementPosition + this.elementHeight);
        this.sugestionsListPos = {
          top: this.elementHeight,
          maxHeight: 250, //spaceBelowElement - this.props.heightBottomThreshold,
        };
        if (
          spaceAboveElement - this.props.heightTopThreshold >
          spaceBelowElement - this.props.heightBottomThreshold
        ) {
          this.sugestionsListPos = {
            bottom: this.elementHeight,
            maxHeight: 250, //spaceAboveElement - this.props.heightTopThreshold,
          };
        }
        this.getDataLogic(str);
      });
    } else {
      this.getDataLogic(str);
    }
  };

  render() {
    return this.state.selectedValue ? (
      <View
        style={[styles.selectedValueArea, this.props.selectedValueAreaStyle]}>
        <Text style={[styles.selectedValue, this.props.textStyle]}>
          {this.state.selectedValue}
        </Text>
        <View style={styles.closeButtonArea}>
          <TouchableWithoutFeedback onPress={this.onSuggestionDeselect}>
            <Icon
              name="md-close-circle"
              style={[styles.icon, this.props.iconStyle]}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    ) : (
      <View style={styles.popupContainer}>
        <View
          style={styles.formContainer}
          ref={(element) => {
            this.myComponent = element;
          }}
          onLayout={() => {}}>
          <TextInput
            placeholder={this.props.placeholder}
            height={700}
            onChangeText={this.onChangeTextDelayed}
            style={[this.props.textStyle, styles.inputForm]}
          />
        </View>
        {this.state.dataSource.length > 0 && this.showSuggestions ? (
          <View style={[styles.suggestionArea, this.sugestionsListPos]}>
            <FlatList
              vertical
              keyboardShouldPersistTaps={'handled'}
              data={this.state.dataSource}
              renderItem={(data) => {
                return (
                  <View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.onSuggestionSelect(
                          data.item[this.props.idKey],
                          data.item[this.props.valueKey],
                        );
                      }}>
                      <View
                        style={[
                          styles.suggestionElementView,
                          this.props.suggestionElementViewStyle,
                        ]}>
                        <Text
                          style={[
                            styles.suggestionItem,
                            this.props.suggestionItemStyle,
                          ]}
                          numberOfLines={1}>
                          {data.item[this.props.valueKey]}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              }}
              keyExtractor={(data) =>
                data[this.props.idKey]
                  ? data[this.props.idKey].toString()
                  : null
              }
            />
          </View>
        ) : null}
      </View>
    );
  }
}

//default props
AutoComplete.defaultProps = {
  placeholder: '',
  data: [],
  heightTopThreshold: 50,
  heightBottomThreshold: 20,
  sorted: true,
};

//prop types validation
AutoComplete.propTypes = {
  selectedValueAreaStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style,
  ]),
  placeholder: PropTypes.string, //placeholder string
  // If this component is used in any scrollView we need to block parent scroll when suggestions appear and re enable scroll when suggestion disappear
  parentEndScroll: PropTypes.func.isRequired,
  parentStartScroll: PropTypes.func.isRequired,
  //Array of objects to bind data
  data: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  //Function to trigger on any option selection
  onSelect: PropTypes.func.isRequired,
  iconStyle: PropTypes.oneOfType([PropTypes.object, ViewPropTypes.style]),
  suggestionElementViewStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style,
  ]),
  suggestionItemStyle: PropTypes.oneOfType([
    PropTypes.object,
    Text.propTypes.style,
  ]),
  //id and value key of data array
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.object, Text.propTypes.style]),
  sorted: PropTypes.bool,
};

//default styles
const styles = StyleSheet.create({
  inputForm: {flex: 1},
  popupContainer: {flex: 1},
  formContainer: {flex: 1, width: '100%'},
  suggestionArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    borderRadius: 2,
    shadowColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 15,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 25,
  },
  suggestionElementView: {
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 14,
    paddingBottom: 14,
    width: '100%',
    zIndex: 9999,
  },
  selectedValueArea: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  closeButtonArea: {
    justifyContent: 'center',
    paddingLeft: 5,
  },
  icon: {
    color: 'gray',
    fontSize: 18,
  },
  suggestionItem: {
    color: 'black',
  },
  selectedValue: {
    color: 'black',
    maxWidth: '95%',
  },
});

export default AutoComplete;
