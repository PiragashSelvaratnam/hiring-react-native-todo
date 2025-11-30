import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import React from "react";
import Animated, { AnimatedStyle } from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonWithIconProps = TouchableOpacityProps & {
  icon: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle> | AnimatedStyle<ViewStyle>;
  iconStyle?: AnimatedStyle<ViewStyle>;
};
export default function ButtonWithIcon({
  icon,
  onPress,
  buttonStyle,
  iconStyle,
  ...props
}: ButtonWithIconProps) {
  return (
    <AnimatedTouchable
      style={[buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <Animated.View style={iconStyle}>{icon}</Animated.View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  fabIcon: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "300",
  },
});
