import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageSave = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e)
    }
}

export const storageLoad = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.log(e)
    }
}

export const storageRemove = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e)
    }

}

