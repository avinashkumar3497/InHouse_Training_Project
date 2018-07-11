import React from 'react';
import { StyleSheet,Button, View, Text, Image, TextInput,TouchableOpacity,KeyboardAvoidingView, Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  TouchableNativeFeedback,
  ImageBackground} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import firebase from 'firebase';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTHmLkEQPe5wwE2xNK0QEndhcGQvPXRBo",
    authDomain: "inhousetrainingproject.firebaseapp.com",
    databaseURL: "https://inhousetrainingproject.firebaseio.com",
    projectId: "inhousetrainingproject",
    storageBucket: "inhousetrainingproject.appspot.com",
    messagingSenderId: "525156008529"
  };
  //firebase.initializeApp(config);
  //!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

class HomeScreen extends React.Component {
  render() {
    return (
      	<View style={{flex:1}}>
		<View style={{flex:1,margin:10,marginBottom:5,borderRadius:5}}>
		   <TouchableNativeFeedback
			onPress={() => this.props.navigation.navigate('Userlogin')}
			background={TouchableNativeFeedback.SelectableBackground()}>
				   <Image
					style={{
						flex:1,
						justifyContent:'center',
						alignItems:'center',
					  width: '100%',
					  height: '100%',
					  borderRadius:10
					}}
					source={require("./user.jpg")} 
				  />
			</TouchableNativeFeedback>
		</View>
		 <View style={{flex:1,margin:10,marginTop:5,borderRadius:5}}>
		   <TouchableNativeFeedback
			onPress={() => this.props.navigation.navigate('Moderatorlogin')}
			background={TouchableNativeFeedback.SelectableBackground()}>
				  <Image
					style={{
						flex:1,
						justifyContent:'center',
						alignItems:'center',
					  width: '100%',
					  height: '100%',
					  borderRadius:10
					}}
					source={require("./moderator.jpg")}
				  />
		  </TouchableNativeFeedback>
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
        <Image  style={styles.logo} source={require('./logo.png')}/>
       
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
class SigninForm extends React.Component{
  constructor(props){
    super(props)
    this.state={ email:'',password:'',error:''}
    this.signinPress=this.signinPress.bind(this);
    }
  
    signinPress(){
  const { email , password}= this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
    alert(error.message);
  }
);
}

  render(){
    return(
      <KeyboardAvoidingView  style={styles.wholeStyle} behavior="padding" enabled >
      <View style={styles.logoContainer}>
        <Image  style={styles.logo} source={require('./logo.png')}/>
      </View>
      <View style={styles.formContainer}>
          <Text >
            Email:
          </Text>
          <TextInput placeholder='user@abc.com' value={this.state.email} onChangeText={( email ) => this.setState({ email })} autoCapitalize="none" placeholderTextColor="#a7a9aa" style={styles.input}/>
          <Text style={styles.logoHeader}>
            Password:
          </Text>
          <TextInput placeholder='Enter Your Password Here' value={this.state.password} onChangeText={( password ) => this.setState({ password })} autoCapitalize="none" placeholderTextColor="#a7a9aa" style={styles.input}/>
          <Text>
          {this.state.error}
          </Text>
        <TouchableOpacity onPress={this.signinPress} style={styles.buttonsContainerL}>
          <Text style={styles.textContainerLogin}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    )
  }
}

class Loginform extends React.Component{
constructor(props){
  super(props)
  this.state={ email:'',password:'',error:''}
  this.loginPress=this.loginPress.bind(this);
  this.signupPress=this.signupPress.bind(this);
}

loginPress(){
  const { email , password}= this.state;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
    alert(error.message);
  }
);
}
signupPress(){
  const { email , password}= this.state;
  //firebase.auth().createUserWithEmailAndPassword(email,password)
  

firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.

    alert(error.message);
  }
);


}
 render(){
    return(
      <View style={styles.formContainer}>
        <Text style={styles.logoHeader}>
          Email:
          </Text>
        <TextInput value={this.state.email} onChangeText={( email ) => this.setState({ email })} autoCapitalize="none" label placeholder="Username Or Email" placeholderTextColor="#a7a9aa"style={styles.input}/>
        <Text style={styles.logoHeader}>
          Password:
          </Text>
        <TextInput value={this.state.password} onChangeText={( password ) => this.setState({ password })} autoCapitalize="none" secureTextEntry placeholder="Password"placeholderTextColor="#a7a9aa"style={styles.input}/>
        <Text>
          {this.state.error}
          </Text>
        <TouchableOpacity onPress={this.loginPress} style={styles.buttonsContainerL}>
          <Text style={styles.textContainerLogin}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ this.signupPress} style={styles.buttonsContainerS}>
            <Text style={styles.textContainerSignup}>
              SIGNUP
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const RootStack = createStackNavigator(
  {
    Home:{ screen:HomeScreen,
	navigationOptions: () => ({title: 'Who are you:',})},	//for title seen createStackNavigator guide
    Userlogin: UserloginScreen,
	Moderatorlogin: SigninForm
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  wholeStyle:{
    flex: 1,
    backgroundColor:'white'
  },
  logoContainer:{
    flex:1,
    alignItems:'center',
    flexGrow: 1,
    justifyContent:'center',
  },
  logo:{
    width:120,
    height: 120
  },
  logoText:{
    color:'black',
    width:150,
    textAlign:'center',
    marginTop:20,
   
  },
  logoHeader:{
    fontSize:17,
    fontWeight:'400'
  },
  input:{
    height:40,
    backgroundColor:'white',
    marginBottom:20,
    color:'black'
  },
  formContainer:{
    padding:30
  },
  buttonsContainerS:{
    backgroundColor:'#0299f7',
    borderRadius:6,
    height:50
  },
  buttonsContainerL:{
    backgroundColor:'#0299f7',
    marginBottom:10,
    marginTop:10,
    height:50,
    borderRadius:6,
  },
  textContainerLogin:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    fontWeight:'100',
    marginTop:10
  },
  textContainerSignup:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    fontWeight:'100',
    marginTop:10
  }
})
