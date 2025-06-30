import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'styles/core/colors';

interface SubHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  leftIcon?: 'arrow-back' | 'close';
}

export default function ModalSubHeader({
  title,
  onBackPress,
  showBackButton = true,
  leftIcon = 'arrow-back',
}: SubHeaderProps) {
  return (
    <View style={styles.subHeader}>
      {showBackButton && onBackPress && (
        <TouchableOpacity
          onPress={onBackPress}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name={leftIcon} size={25} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      <Text style={styles.subHeaderText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  subHeaderText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
  },

  backButton: {
    position: 'absolute',
    left: 18,
    top: 18,
  },
});
