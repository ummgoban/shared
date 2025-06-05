import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
}

const Button = ({title, onPress, color = '#007AFF', disabled = false}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
