/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Platform,
  Alert
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import RNWhatsAppStickers from 'react-native-whatsapp-stickers'

const config = {
  "identifier": "pakaji",
  "name": "pakaji",
  "publisher": "Mudassir Malik",
  "tray_image_file": "tray_icon.png",
  "publisher_email": "malikjrw147@gmail.com",
  "publisher_website": "https://portfolio-2022-dbced.web.app/",
  "privacy_policy_website": "https://portfolio-2022-dbced.web.app/",
  "license_agreement_website": "https://portfolio-2022-dbced.web.app/",
  "stickers": [
    {
      fileName: '01_Cuppy_smile.png',
      emojis: ['☕', '🙂'],
    },
    {
      fileName: '02_Cuppy_lol.png',
      emojis: ['😄', '😀'],
    },
    {
      fileName: '03_Cuppy_rofl.png',
      emojis: ['😆', '😂'],
    },
  ],
}
const { stickers, ...packConfig } = config
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const logError = e => {
    console.log(e)
    Alert.alert('Error', e.message)
  }
  const sendStickerPack = () => {
    if (Platform.OS === 'ios') {
      RNWhatsAppStickers.createStickerPack(packConfig)
        .then(() => {
          const promises = stickers.map(item =>
            RNWhatsAppStickers.addSticker(item.fileName, item.emojis)
          )
          Promise.all(promises).then(() => RNWhatsAppStickers.send())
        })
        .catch(logError)
    } else {
      RNWhatsAppStickers.send('myprojectstickers', 'MyProject Stickers')
        .then(() => console.log('success'))
        .catch(logError)
    }
  }
  React.useEffect(() => {
    RNWhatsAppStickers.isWhatsAppAvailable()
      .then(isWhatsAppAvailable => {
        console.log('[isWhatsAppAvailable]', isWhatsAppAvailable);
        if (isWhatsAppAvailable) {
          if (Platform.OS === 'ios') {
            return RNWhatsAppStickers.createStickerPack(packConfig)
              .then(() => {
                const promises = stickers.map(item =>
                  RNWhatsAppStickers.addSticker(item.fileName, item.emojis)
                )
                Promise.all(promises).then(() => RNWhatsAppStickers.send())
              })
              .catch(e => console.log(e))
          }

          return RNWhatsAppStickers.send('pakaji', 'Pakaji Stickers')
        }

        return undefined
      })
      .catch(logError)
  }, [])
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#000" }}>Welcome to Pakaji</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
