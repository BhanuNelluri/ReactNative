import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Header from './components/Header';
import AnimeCard from './components/AnimeCard';
import minato from './assets/minato.png'
import itachi from './assets/Itachi.png'
import UserCard from './components/UserCard';
const info1 = {
  name:"Minato",
  clan:"Uzmaki clan",
  image:minato
}

const info2 = {
  name:"Itachi",
  clan:"Uchiha clan",
  image:itachi
}


export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '467432438449-fiq9lnrsaa5q58s3tdca4ajhjc2dhmio.apps.googleusercontent.com',
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  const onGoogleButtonPress = async()=> {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user)=>{
      console.log(user);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  const signOut = async ()=>{
    try{
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    }catch(error){
      console.error(error);
    }
  }

  if (initializing) return null;
  if(!user){
    return(
      <View style={styles.container}>
        <Header/>
        <GoogleSigninButton
           style={{width:300, height:65}}
           onPress={onGoogleButtonPress}
        />
        <AnimeCard info={info1}/>
      </View>
    )
  }
  return(
    <ScrollView>
    <View style={styles.container}>
      <View style = {{marginTop:10,alignItems:'center'}}>
        <UserCard name={user.displayName} image={user.photoURL} signout={signOut}/>
        <View style={styles.info}>
        <AnimeCard info={info1}/>
        <AnimeCard info={info2}/>
        </View>
      </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:23,
    fontWeight:'bold'
  },
  info:{
    marginBottom:50
  }
});
