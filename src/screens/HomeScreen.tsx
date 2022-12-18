// import {StackScreenProps} from '@react-navigation/stack/lib/typescript/src/types';
import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import {GradientBackground} from '../components/GradientBackground';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import {getColorsFromImage} from '../helpers/getColors';
import {GradientContext} from '../context/GradientContext';

// interface Props extends StackScreenProps<any, any> {}

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRated, upcoming} = useMovies();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movieCurrent = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movieCurrent.poster_path}`;

    const response = await getColorsFromImage(uri);

    if (response && response.primary && response.secondary) {
      setMainColors({
        primary: response.primary,
        secondary: response.secondary,
      });
    }
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

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
    <GradientBackground>
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
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          <HorizontalSlider movies={popular} title="Populares" />
          <HorizontalSlider movies={topRated} title="Top Rated" />
          <HorizontalSlider movies={upcoming} title="Up Coming" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
