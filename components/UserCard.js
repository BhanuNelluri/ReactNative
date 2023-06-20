import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';

const UserCard = ({name,image,signout}) => {
    console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={{uri:image}} />
        <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
          <View style={styles.button}>
            <Button title='Sign Out' onPress={signout} />
          </View>
        </View>
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    display:'flex',
    flexDirection:'row',
    width: deviceWidth - offset,
    backgroundColor: '#fff',
    height: 100,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius:50,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft:20
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
    marginTop:10
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button:{
    width:100,
    marginTop:10
  }
});

export default UserCard;