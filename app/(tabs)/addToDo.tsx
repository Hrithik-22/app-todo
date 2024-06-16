import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { TextInput, Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from "@/store/todoStore";

const AddTodoScreen = () => {
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Please enter a task for the TODO item.");
      return;
    }
    addTodo(title);
    setTitle("");
    setSuccessMessage("Task added successfully!");
    //closes the keyboard after submission
    Keyboard.dismiss();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Add a new TODO item</Text>
      </View>
      <View style={styles.content}>
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
        <TextInput
          mode="outlined"
          label="Enter a Task"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          textColor="white"
          theme={{
            colors: {
              primary: "#3182ce",
              placeholder: "#cbd5e0",
              text: "#e2e8f0",
            },
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Changed to match HomeScreen
  },
  header: {
    backgroundColor: "#1f1f1f", // Changed to match HomeScreen
  },
  headerTitle: {
    color: "#fff",
  },
  statusContainer: {
    padding: 16,
    backgroundColor: "#1f1f1f", // Changed to match HomeScreen
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 16,
    backgroundColor: "#1f1f1f", // Changed to match HomeScreen
    flex: 1,
  },
  successMessage: {
    color: "#38a169",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2a2a2a", // Changed to match HomeScreen
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3182ce",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddTodoScreen;
