import {View, Text} from 'react-native'
import React from 'react'

const Header = ()=>{
   return(
     <View style={{marginLeft:0,marginTop:30}}>
        <Text style={{marginBottom:10, fontSize: 20, fontWeight: '800'}}>
            SignIn With Google Account
        </Text>
     </View>
   )
}
export default Header

