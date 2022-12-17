import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {MovieDB} from '../api/MovieDB';
import {ResponseDataMovie} from '../interfaces/movieInterface';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  useEffect(() => {
    MovieDB.get<ResponseDataMovie>('/now_playing').then(response =>
      console.log(response.data),
    );
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Ir al detalle"
        onPress={() => navigation.navigate('DetailScreen')}
      />
    </View>
  );
};
