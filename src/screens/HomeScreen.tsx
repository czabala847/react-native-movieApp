// import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';

// interface Props extends StackScreenProps<any, any> {}

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRated, upcoming} = useMovies();

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
            data={nowPlaying}
            renderItem={({item}) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        <HorizontalSlider movies={popular} title="Populares" />
        <HorizontalSlider movies={topRated} title="Top Rated" />
        <HorizontalSlider movies={upcoming} title="Up Coming" />
      </View>
    </ScrollView>
  );
};
