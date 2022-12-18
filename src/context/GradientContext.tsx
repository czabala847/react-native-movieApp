import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (color: ImageColors) => void;
  setPrevMainColors: (color: ImageColors) => void;
}

export const GradientContext = createContext<ContextProps>({} as ContextProps);

interface PropsProvider {
  children: JSX.Element;
}

const initialState: ImageColors = {
  primary: 'transparent',
  secondary: 'transparent',
};

export const GradientProvider: React.FC<PropsProvider> = ({children}) => {
  const [colors, setColors] = useState<ImageColors>(initialState);
  const [prevColors, setPrevColors] = useState<ImageColors>(initialState);

  const setMainColors = (color: ImageColors) => {
    setColors(color);
  };

  const setPrevMainColors = (color: ImageColors) => {
    setPrevColors(color);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
