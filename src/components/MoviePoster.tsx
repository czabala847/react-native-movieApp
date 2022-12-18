import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Movie} from '../interfaces/movieInterface';
import {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack/lib/typescript/src/types';
import {RootStackParams} from '../navigation/Navigation';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

interface DetailMovieScreenProps
  extends StackScreenProps<RootStackParams, 'DetailScreen'>,
    StackNavigationProp<RootStackParams, 'DetailScreen'> {}

export const MoviePoster: React.FC<Props> = ({
  movie,
  height = 420,
  width = 300,
}) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigation = useNavigation<DetailMovieScreenProps>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailScreen', movie)}
      style={{
        height,
        width,
        marginHorizontal: 2,
        paddingBottom: 20,
        paddingHorizontal: 7,
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 18,
    elevation: 5,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    borderRadius: 18,
    flex: 1,
    shadowColor: '#000',
  },
});
