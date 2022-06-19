import * as SecureStore from "expo-secure-store";

const PaybackCredentialsKey = "PaybackCredentials";

export async function setCredentials(username, password) {
  await SecureStore.setItemAsync(
    PaybackCredentialsKey,
    JSON.stringify({ username: username, password: password })
    // { keychainService: PaybackCredentialsKey }
  );
}

export async function getCredentials() {
  let result = await SecureStore.getItemAsync(PaybackCredentialsKey, {
    // keychainService: PaybackCredentialsKey,
  });
  if (result) {
    return {
      username: JSON.parse(result).username,
      password: JSON.parse(result).password,
    };
  } else {
    throw "No credentials maintained";
  }
}

export async function clearCredentials() {
  await SecureStore.deleteItemAsync(PaybackCredentialsKey, {
    // keychainService: PaybackCredentialsKey,
  });
}
