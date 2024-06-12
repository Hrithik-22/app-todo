// AddTodoScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useTodoStore } from "@/store/todoStore";

const AddTodoScreen = () => {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAddTodo = () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Please enter a title for the TODO item.");
      return;
    }
    addTodo(title);
    setTitle("");
  };

  return (
    <View className="flex-1 justify-center p-4">
      <TextInput
        className="h-10 border-gray-400 border-b mb-4 pl-2 text-white"
        placeholder="Enter TODO item"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
};

export default AddTodoScreen;
