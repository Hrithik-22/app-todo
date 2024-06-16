import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useTodoStore } from "../../store/todoStore";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoItem from "@/components/TodoItem";
import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const {
    todos,
    paginatedTodos,
    fetchTodos,
    fetchAllTodos,
    toggleTodo,
    deleteTodo,
  } = useTodoStore();
  const [filter, setFilter] = useState<"all" | "active" | "done">("active");
  const [sort, setSort] = useState<"title" | "recent" | "id">("recent");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllTodos();
    fetchTodos(page);
  }, []);

  const loadMoreTodos = () => {
    if (!loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      fetchTodos(page + 1).finally(() => setLoading(false));
    }
  };

  const filteredTodos = paginatedTodos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "done") return todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "recent")
      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    return 0;
  });

  const totalTasks = todos.length;
  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
      <View
        style={{
          padding: 16,
          backgroundColor: "#1f1f1f",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
          Todo App - by Hrithik Kedare
        </Text>
        <Text style={{ color: "white", fontSize: 18 }}>
          {remainingTasks} of {totalTasks} tasks remaining
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          justifyContent: "space-between",
          padding: 16,
          backgroundColor: "#1f1f1f",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", marginRight: 8 }}>Sort by:</Text>
          <Button
            mode={sort === "title" ? "contained" : "outlined"}
            onPress={() => setSort("title")}
            style={{ marginHorizontal: 4 }}
          >
            Alphabetic Order
          </Button>
          <Button
            mode={sort === "recent" ? "contained" : "outlined"}
            onPress={() => setSort("recent")}
            style={{ marginHorizontal: 4 }}
          >
            Recent
          </Button>
          <Button
            mode={sort === "id" ? "contained" : "outlined"}
            onPress={() => setSort("id")}
            style={{ marginHorizontal: 4 }}
          >
            ID
          </Button>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", marginRight: 8 }}>Filter:</Text>
          <Button
            mode={filter === "all" ? "contained" : "outlined"}
            onPress={() => setFilter("all")}
            style={{ marginHorizontal: 4 }}
          >
            All
          </Button>
          <Button
            mode={filter === "active" ? "contained" : "outlined"}
            onPress={() => setFilter("active")}
            style={{ marginHorizontal: 4 }}
          >
            Active
          </Button>
          <Button
            mode={filter === "done" ? "contained" : "outlined"}
            onPress={() => setFilter("done")}
            style={{ marginHorizontal: 4 }}
          >
            Done
          </Button>
        </View>
      </View>
      <FlatList
        data={sortedTodos}
        keyExtractor={(item) => item.title + item.created_at}
        renderItem={({ item }) => (
          <TodoItem
            title={item.title}
            completed={item.completed}
            createdAt={item.created_at}
            updatedAt={item.updated_at}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        onEndReached={loadMoreTodos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
      />
    </SafeAreaView>
  );
}
