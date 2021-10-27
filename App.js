import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswaldFonts,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLatoFonts,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import * as firebase from "firebase";

import Navigation from "./src/navigation";
import { theme } from "./src/theme";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcr5wXWKeA_jwT-hHqB8P-c7HNqZUC33c",
  authDomain: "mealstogo-8109e.firebaseapp.com",
  projectId: "mealstogo-8109e",
  storageBucket: "mealstogo-8109e.appspot.com",
  messagingSenderId: "143702154607",
  appId: "1:143702154607:web:b10e7b884ccdd0c9821c9a",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const App = () => {
  const [oswaldLoaded] = useOswaldFonts({
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
  });
  const [latoLoaded] = useLatoFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!oswaldLoaded || !latoLoaded) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
