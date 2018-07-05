import React from 'react';
import { StyleSheet,Button, View, Text, Image, TextInput,TouchableOpacity,KeyboardAvoidingView, Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar} from 'react-native';
  import { BarCodeScanner, Permissions } from 'expo';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.containers}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Userlogin')}
            title="User"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('Moderatorlogin')}
            title="Moderator"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

class UserloginScreen extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.wholeStyle} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./panda.jpg')}/>
          <Text style={styles.logoText}>
            App made for Common people :)
            </Text>
        </View>
        <View style={styles.formContainer}>
            <Loginform/>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

class ModeratorloginScreen extends React.Component {
	state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };
  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: 300,
                    width: 300,
                  }}

                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
        <Text> -----------OR-----------</Text>
         <TextInput
                    style={
                      {
                        alignItems: 'center',
                        height: 50,
                        width:300,
                        justifyContent: 'space-between',
                        fontSize: 18
                      }
                    }
                    placeholder='Enter Driving License Number'
                    />
      </View>
    );
  }
    _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const Loginform = function(){
  return(
    <View style={styles.formContainer}>
      <TextInput placeholder="Username Or Email" placeholderTextColor="black"style={styles.input}/>
      <TextInput secureTextEntry placeholder="Password"placeholderTextColor="black"style={styles.input}/>
      <TouchableOpacity style={styles.buttonsContainer}>
        <Text style={styles.textContainer}>
          LOGIN
        </Text>
        </TouchableOpacity>
    </View>
  )
}

const RootStack = createStackNavigator(
  {
    Home:{ screen:HomeScreen,
	navigationOptions: () => ({title: 'Who are you:',})},	//for title seen createStackNavigator guide
    Userlogin: UserloginScreen,
	Moderatorlogin: ModeratorloginScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  containers: {
   flex: 1,
   justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 20
  },
  wholeStyle:{
    flex: 1,
    backgroundColor:'#45aaf2'
  },
  logoContainer:{
    flex:1,
    alignItems:'center',
    flexGrow: 1,
    justifyContent:'center'
  },
  logo:{
    width:100,
    height: 100
  },
  logoText:{
    color:'black',
    width:150,
    textAlign:'center',
    marginTop:20,
   
  },
  input:{
    height:40,
    backgroundColor:'#76c4f2',
    marginBottom:20,
    color:'black'
  },
  formContainer:{
    padding:50
  },
  buttonsContainer:{
    backgroundColor:'#297fb2'
  },
  textContainer:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    fontWeight:'700'
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#34495E',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },

})
