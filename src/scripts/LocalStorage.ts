import AsyncStorage from '@react-native-async-storage/async-storage';
import { APICall } from 'types/APIs';


// Saves an API call based on the data passed and will generate a new unique ID if required
export async function SaveAPICall(APICallData: APICall) {
  try {
    const currentSavedAPICalls = await AsyncStorage.getItem('SavedAPICalls');

    const parsed = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

    if (APICallData.id == 'getFromScript') {
      const newID = await generateNewUniqueID();
      if (!newID) return false; // Exit if script errored trying to make a new id

      APICallData = {
        ...APICallData,
        id: newID,
      };
    }

    const updatedSavedAPICalls = [...parsed, APICallData];

    await AsyncStorage.setItem(
      'SavedAPICalls',
      JSON.stringify(updatedSavedAPICalls),
    );
    return true;
  } catch (error) {
    console.error('Failed to save API call:', error);
    return false;
  }
}

// Returns all API calls in storage
export async function GetAllAPICalls() {
  try {
    const currentSavedAPICalls = await AsyncStorage.getItem('SavedAPICalls');

    const parsed = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

    return parsed;
  } catch (error) {
    console.error('Failed to save API call:', error);
    return false;
  }
}


// Returns API call based on the id passed
export async function GetAPICallByID(id: APICall['id']) {
  const currentSavedAPICalls = await AsyncStorage.getItem('SavedAPICalls');
  const parsed = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

  return findCallById(parsed, id) as APICall
}


// Delete an API call based on the id passed 
export async function DeleteAPICall(id: APICall['id']): Promise<boolean> {
  try {
    const currentSavedAPICalls = await AsyncStorage.getItem('SavedAPICalls');
    const parsed: APICall[] = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

    const updatedSavedAPICalls = parsed.filter(api => api.id !== id);

    await AsyncStorage.setItem(
      'SavedAPICalls',
      JSON.stringify(updatedSavedAPICalls),
    );

    return true;
  } catch (error) {
    console.error('Failed to delete API call:', error);
    return false;
  }
}

// Deletes all API Calls in storage
export async function DeleteAllAPICalls() {
  return await AsyncStorage.setItem('SavedAPICalls', '{}')
}


function findCallById(calls: APICall[], id: APICall['id']): APICall | false {
  const match = calls.find(call => call.id === id);
  return match ?? false;
}

export async function generateNewUniqueID(): Promise<string | false> {
  const allCalls: APICall[] = await GetAllAPICalls();
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 16;

  const generateId = (): string =>
    Array.from({ length: idLength }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length)),
    ).join('');

  for (let i = 0; i < 5; i++) {
    const testID = generateId();
    const existingCall = findCallById(allCalls, testID);
    if (!existingCall) return testID;
  }

  return false;
}