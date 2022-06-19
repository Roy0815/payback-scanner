import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";

import * as accountFunctions from "../../functions/accountFunctions";

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    accountFunctions
      .getCredentials()
      .then((result) => {
        setEmail(result.username);
        setPassword(result.password);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        if ((err = "No credentials maintained")) {
          setLoaded(true);
        }
      });
  }

  const toast = useToast();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>Payback Data</Text>
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        value={email}
        autoComplete={"email"}
        style={styles.input}
        onChangeText={setEmail}
        keyboardType={"email-address"}
      />
      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput
        value={password}
        autoComplete={"password"}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={styles.horizontalContainer}>
        <Button
          title="Check"
          style={styles.horizontalButtons}
          onPress={() => {
            toast.show("Credentials correct", { type: "success" });
          }}
        />
        <Button
          title="Save"
          style={styles.horizontalButtons}
          onPress={() => {
            console.log("Button save");
            accountFunctions.setCredentials(email, password);
            toast.show("Credentials saved", { type: "success" });
          }}
        />
      </View>
      <View style={styles.horizontalContainer}>
        <Button
          title="Cancel"
          style={styles.horizontalButtons}
          onPress={() => {
            console.log("Button cancel");
            accountFunctions
              .getCredentials()
              .then((result) => {
                setEmail(result.username);
                setPassword(result.password);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <Button
          title="Clear"
          style={styles.horizontalButtons}
          onPress={() => {
            console.log("Button clear");
            accountFunctions.clearCredentials().then(() => {
              setEmail(null);
              setPassword(null);
              toast.show("Credentials cleared", { type: "success" });
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 5,
    justifyContent: "space-around",
  },
  horizontalButtons: {},
  inputLabel: {
    padding: 4,
  },
  sectionText: {
    fontWeight: "bold",
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
