import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

interface TodoItemProps {
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  title,
  completed,
  createdAt,
  updatedAt,
  onToggle,
  onDelete,
}) => {
  return (
    <View
      style={{ backgroundColor: "#1f1f1f" }}
      className="flex-row justify-center gap-3 items-center p-4 border-b border-gray-300 "
    >
      <Checkbox
        value={completed}
        onValueChange={onToggle}
        color={completed ? "green" : undefined}
      />
      <Text className="flex-1 text-lg text-white">{title}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text className="text-red-500">🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
