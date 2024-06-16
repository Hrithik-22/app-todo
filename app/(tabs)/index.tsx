// Home page for todo

import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useTodoStore } from "../../store/todoStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import TodoItem from "@/components/TodoItem";

export default function HomeScreen() {
  const { todos, fetchTodos, toggleTodo, deleteTodo } = useTodoStore();
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [sort, setSort] = useState<"title" | "status" | "recent" | "id">(
    "title"
  );
  const navigation = useNavigation();

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "done") return todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "status") return Number(a.completed) - Number(b.completed);
    if (sort === "id") return a.id - b.id;
    return 0;
  });

  const totalTasks = todos.length;
  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  return (
    <SafeAreaView>
      <View className="bg-black p-2 h-full">
        <View className="flex-row justify-between p-2">
          <Text className="text-white">
            {remainingTasks} of {totalTasks} tasks remaining
          </Text>
        </View>
        <View className="flex-row justify-between p-2">
          <TouchableOpacity onPress={() => setSort("title")}>
            <Text className="text-white">Sort by Title</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort("status")}>
            <Text className="text-white">Sort by Status</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort("recent")}>
            <Text className="text-white">Sort by Most Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort("id")}>
            <Text className="text-white">Sort by ID</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between p-2">
          <TouchableOpacity onPress={() => setFilter("all")}>
            <Text className="text-white">All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("active")}>
            <Text className="text-white">Active</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("done")}>
            <Text className="text-white">Done</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={sortedTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              title={item.title}
              completed={item.completed}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
