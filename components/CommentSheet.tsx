import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Keyboard,
  Animated,
  Platform,
} from "react-native";
import { CommentNode } from "@/types/meal";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  comments: CommentNode[];
  onClose: () => void;
}

export default function CommentSheet({ comments, onClose }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const [text, setText] = useState("");
  const sendOpacity = useRef(new Animated.Value(0)).current;

  const insets = useSafeAreaInsets();

  // -----------------------------
  // AUTO-FOCUS INPUT ON OPEN
  // -----------------------------
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, []);

  // -----------------------------
  // KEYBOARD LISTENERS
  // -----------------------------
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        Animated.timing(keyboardOffset, {
          toValue: e.endCoordinates.height,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // -----------------------------
  // SEND BUTTON ANIMATION
  // -----------------------------
  useEffect(() => {
    Animated.timing(sendOpacity, {
      toValue: text.length > 0 ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [text]);

  // -----------------------------
  // DRAG DOWN ONLY
  // -----------------------------
  const onGestureEvent = (e: any) => {
    if (e.nativeEvent.translationY < 0) return; // block upward drag
    translateY.setValue(e.nativeEvent.translationY);
  };

  const onGestureEnd = (event: any) => {
    const drag = event.nativeEvent.translationY;
    const velocity = event.nativeEvent.velocityY;

    if (drag > 80 || velocity > 800) {
      Animated.timing(translateY, {
        toValue: 600,
        duration: 200,
        useNativeDriver: false,
      }).start(onClose);
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEnd}
      >
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.handle} />

          <ScrollView style={styles.scroll}>
            {comments.map((c) => (
              <View key={c.id} style={styles.commentRow}>
                <Text style={styles.username}>{c.user.username}</Text>
                <Text style={styles.comment}>{c.text}</Text>
              </View>
            ))}
          </ScrollView>

          {/* INPUT BAR FLOATS ABOVE KEYBOARD */}
          <Animated.View
            style={[
              styles.inputBar,
              {
                marginBottom: keyboardOffset,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                ref={inputRef}
                value={text}
                onChangeText={setText}
                placeholder="Add a comment..."
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>

            <Animated.View style={{ opacity: sendOpacity, marginLeft: 10 }}>
              <Pressable
                onPress={() => {
                  console.log("send:", text);
                  setText("");
                }}
              >
                <Text style={styles.send}>Send</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 999,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    height: "70%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginVertical: 10,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 2,
  },

  commentRow: {
    marginBottom: 14,
  },

  username: {
    fontWeight: "700",
    color: "#111",
    marginBottom: 2,
  },

  comment: {
    color: "#333",
    fontSize: 14,
  },

  inputBar: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
  },

  send: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
