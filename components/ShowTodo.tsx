import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
interface TodoItemProps {
    title: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
}
  