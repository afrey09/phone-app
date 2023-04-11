import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from 'native-base';
import { StyleSheet, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <NativeBaseProvider>
      <Box safe area
        bg={{
          linearGradient: {
            colors: ['blue.500', 'blue.300'],
            start: [1, 0],
            end: [0.5, 0],
          }
        }}
      >Calendar
      </Box>
      <Box 
        bg={'primary.500'}
        p="5"
        rounded="xl"
        _text={{
          fontsize: 'md',
          fontWeight: 'xl',
          color:'warmGray.50',
          textAlign: 'center'
        }}
        >
      <Button title="Create a new calendar" onPress={createCalendar} />
        </Box>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
