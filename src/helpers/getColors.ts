import ImageColors from 'react-native-image-colors';

export const getColorsFromImage = async (uri: string) => {
  try {
    const result = await ImageColors.getColors(uri, {});

    let primary, secondary;

    switch (result.platform) {
      case 'android':
        primary = result.dominant;
        secondary = result.average;
        break;
      case 'ios':
        // iOS result properties
        primary = result.primary;
        secondary = result.secondary;
        break;
      default:
        throw new Error('Unexpected platform key');
    }

    return {primary, secondary};
  } catch (error) {
    console.log(error);
  }
};
