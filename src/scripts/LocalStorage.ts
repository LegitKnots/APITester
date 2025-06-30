import AsyncStorage from "@react-native-async-storage/async-storage";
import { APICall } from "types/APIs";

export async function SaveAPICall(APICallData: APICall) {
  try {
    const currentSavedAPICalls = await AsyncStorage.getItem("SavedAPICalls");

    const parsed = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

    const updatedSavedAPICalls = [...parsed, APICallData];

    await AsyncStorage.setItem("SavedAPICalls", JSON.stringify(updatedSavedAPICalls));
    return true
  } catch (error) {
    console.error("Failed to save API call:", error);
    return false
  }
}


export async function GetAllAPICalls() {
  try {
    const currentSavedAPICalls = await AsyncStorage.getItem("SavedAPICalls");

    const parsed = currentSavedAPICalls ? JSON.parse(currentSavedAPICalls) : [];

    return parsed
    
  } catch (error) {
    console.error("Failed to save API call:", error);
    return false
  }
}
