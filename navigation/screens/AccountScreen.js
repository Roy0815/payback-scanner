import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useToast } from "react-native-toast-notifications";

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const toast = useToast();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>Payback Data</Text>
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        value={useState.email}
        autoComplete={"email"}
        style={styles.input}
        onChangeText={setEmail}
        keyboardType={"email-address"}
      />
      <Text style={styles.inputLabel}>Password:</Text>
      <TextInput
        value={useState.password}
        autoComplete={"password"}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <View style={styles.horizontalContainer}>
        <Button
          title="Check credentials"
          style={styles.horizontalButtons}
          onPress={() => {
            toast.show("Credentials correct", { type: "success" });
          }}
        />
        <Button
          title="Save credentials"
          style={styles.horizontalButtons}
          onPress={() => {
            toast.show("Credentials saved", { type: "success" });
          }}
        />
      </View>
      <Button
        title="Show credentials"
        onPress={() => {
          toast.show(`Email: ${email}\nPassword: ${password}`);
        }}
      />
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
