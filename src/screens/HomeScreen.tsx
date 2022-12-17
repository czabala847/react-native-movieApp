// import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';

// interface Props extends StackScreenProps<any, any> {}

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
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
    <ScrollView>
      <View
        style={{
          marginTop: top + 20,
        }}>
        {/* Carrusel principal */}
        <View
          style={{
            height: 440,
          }}>
          <Carousel
            data={moviesNowPlaying}
            renderItem={({item}) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
          />
        </View>

        {/* Películas Populares */}
        <View style={{backgroundColor: 'red', height: 260}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>En cine</Text>
          <FlatList
            data={moviesNowPlaying}
            renderItem={({item}) => (
              <MoviePoster movie={item} width={140} height={200} />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Películas Populares */}
        <View style={{backgroundColor: 'red', height: 260}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>En cine</Text>
          <FlatList
            data={moviesNowPlaying}
            renderItem={({item}) => (
              <MoviePoster movie={item} width={140} height={200} />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Películas Populares */}
        <View style={{backgroundColor: 'red', height: 260}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>En cine</Text>
          <FlatList
            data={moviesNowPlaying}
            renderItem={({item}) => (
              <MoviePoster movie={item} width={140} height={200} />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};
