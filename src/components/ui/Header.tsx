'use client';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from 'styles/core/colors';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  leftIcon?: 'leftArrow' | 'close';
  rightIcon?: 'menu' | 'info' | 'settings' | 'refresh' | any;
  onRightPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  opacity?: number;
  overlay?: boolean;
  minHieght?: number;
  maxHeight?: number;
  topPadding?: boolean;
}

export default function Header({
  title,
  onBackPress,
  showBackButton = true,
  leftIcon = 'leftArrow',
  rightIcon = null,
  onRightPress,
  backgroundColor = COLORS.background.secondary,
  textColor = COLORS.primary,
  opacity = 100,
  overlay = false,
  minHieght = 56,
  maxHeight = 65,
  topPadding = true
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  const clampedOpacity = Math.min(1, Math.max(0, opacity / 100));

  const getLeftIconName = () => {
    switch (leftIcon) {
      case 'leftArrow':
        return 'arrow-back';
      case 'close':
        return 'close';
      default:
        return 'arrow-back';
    }
  };

  const getRightIconName = () => {
    switch (rightIcon) {
      case 'menu':
        return 'more-vert';
      case 'info':
        return 'info';
      case 'settings':
        return 'settings';
      case 'refresh':
        return 'refresh';
      default:
        return rightIcon ?? null;
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />

      {/* Top padding for status bar area */}
      {topPadding && <View style={{ height: insets.top, backgroundColor }} />}
      {/* Header container */}
      <View
        style={[
          styles.headerContainer,
          {
            minHeight: minHieght,
            maxHeight: maxHeight,
            backgroundColor,
            opacity: clampedOpacity,
            position: overlay ? 'absolute' : 'static',
            top: insets.top,
          },
        ]}
      >
        {/* Left Icon */}
        <View style={styles.sideIconContainer}>
          {showBackButton && onBackPress && (
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
              <MaterialIcons
                name={getLeftIconName()}
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.titleText, { color: textColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        {/* Right Icon */}
        <View style={styles.sideIconContainer}>
          {rightIcon && onRightPress && getRightIconName() && (
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
              <MaterialIcons
                name={getRightIconName() as string}
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sideIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
