import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {useMovies} from '../hooks/useMovies';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  const {isLoading, moviesNowPlaying} = useMovies();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

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
