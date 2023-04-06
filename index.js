// In index.js of a new project
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Button, StyleSheet, I18nManager} from 'react-native';
import {Navigation} from 'react-native-navigation';
import RNRestart from 'react-native-restart';
const isRTL = I18nManager.isRTL;

const forceRtl = async (lang = 'en') => {
  await I18nManager.forceRTL(lang === 'ar');
  await I18nManager.allowRTL(lang === 'ar');
};

if (!isRTL) {
  forceRtl('ar');
  RNRestart.Restart();
}

// Home screen declaration
const HomeScreen = props => {
  console.log('isRTL', isRTL);

  return (
    <View style={styles.root}>
      <Text>Hello React Native Navigation 👋</Text>
      <Button
        title="Push Settings Screen"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'Settings',
              options: {
                topBar: {
                  title: {
                    text: 'Settings',
                  },
                },
              },
            },
          })
        }
      />
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'Home',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
};

// Settings screen declaration - this is the screen we'll be pushing into the stack
const SettingsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Settings Screen</Text>
    </View>
  );
};

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
