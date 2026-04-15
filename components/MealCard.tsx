// CLEAN MEALCARD WITH TILT ONLY — NO PARTICLES

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { Meal } from "@/types/meal";

import UpvoteIcon from "./icons/UpvoteIcon";
import DownvoteIcon from "./icons/DownvoteIcon";

import * as Haptics from "expo-haptics";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
  meal: Meal;
  onOpenComments: () => void;
  isCommentOpen: boolean;
}

export default function MealCard({ meal, onOpenComments, isCommentOpen }: Props) {
  // -----------------------------
  // VOTING SYSTEM
  // -----------------------------
  const [vote, setVote] = useState<0 | 1 | -1>(0);
  const [score, setScore] = useState(meal.helpful ?? 0);

  const scoreScale = useRef(new Animated.Value(1)).current;

  const animateScore = () => {
    Animated.sequence([
      Animated.timing(scoreScale, {
        toValue: 1.22,
        duration: 80,
        useNativeDriver: false,
      }),
      Animated.timing(scoreScale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // -----------------------------
  // MICRO BOUNCE
  // -----------------------------
  const upvoteScale = useRef(new Animated.Value(1)).current;
  const downvoteScale = useRef(new Animated.Value(1)).current;

  const microBounce = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.92,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1.06,
        duration: 55,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // -----------------------------
  // TILT (TikTok‑style snappy)
  // -----------------------------
  const upvoteTilt = useRef(new Animated.Value(0)).current;
  const downvoteTilt = useRef(new Animated.Value(0)).current;

  const tilt = (anim: Animated.Value, direction: "up" | "down") => {
    anim.setValue(direction === "up" ? -8 : 8); // MORE NOTICEABLE
    Animated.timing(anim, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }).start();
  };

  // -----------------------------
  // NEON FLASH
  // -----------------------------
  const pressGlow = useRef(new Animated.Value(0)).current;

  const glowPulse = () => {
    pressGlow.setValue(0);
    Animated.sequence([
      Animated.timing(pressGlow, {
        toValue: 1,
        duration: 70,
        useNativeDriver: false,
      }),
      Animated.timing(pressGlow, {
        toValue: 0,
        duration: 70,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const upvotePulseFill = pressGlow.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FF6A00", "#FFB060"],
  });

  const downvotePulseFill = pressGlow.interpolate({
    inputRange: [0, 1],
    outputRange: ["#007AFF", "#66CCFF"],
  });

  // -----------------------------
  // HANDLE VOTE
  // -----------------------------
  const handleVote = (direction: 1 | -1) => {
    animateScore();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (direction === 1) {
      microBounce(upvoteScale);
      tilt(upvoteTilt, "up");
      glowPulse();
    } else {
      microBounce(downvoteScale);
      tilt(downvoteTilt, "down");
      glowPulse();
    }

    if (vote === direction) {
      setVote(0);
      setScore(score - direction);
    } else {
      const diff = direction - vote;
      setVote(direction);
      setScore(score + diff);
    }
  };

  // -----------------------------
  // COMMENT SHEET SCALE + DIM
  // -----------------------------
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dimAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isCommentOpen ? 0.92 : 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(dimAnim, {
        toValue: isCommentOpen ? 0.35 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isCommentOpen]);

  // -----------------------------
  // ICON GLOW
  // -----------------------------
  const iconGlow = useRef(new Animated.Value(0)).current;
  const groupGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(iconGlow, {
      toValue: vote !== 0 ? 1 : 0,
      duration: 160,
      useNativeDriver: false,
    }).start();

    Animated.timing(groupGlow, {
      toValue: vote !== 0 ? 1 : 0,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [vote]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: meal.image }} style={styles.image} />

        {/* DIM OVERLAY */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: "black",
              opacity: dimAnim,
            },
          ]}
        />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* ACTION ROW */}
        <View style={styles.actionsRow}>
          {/* VOTE GROUP */}
          <Animated.View
            style={[
              styles.voteGroup,
              {
                transform: [
                  {
                    scale: groupGlow.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* UPVOTE */}
            <Animated.View
              style={{
                transform: [
                  { scale: upvoteScale },
                  {
                    rotate: upvoteTilt.interpolate({
                      inputRange: [-8, 8],
                      outputRange: ["-8deg", "8deg"],
                    }),
                  },
                ],
              }}
            >
              <Pressable onPress={() => handleVote(1)}>
                <View style={styles.iconWrapper}>
                  {/* NEON */}
                  <Animated.View
                    style={[
                      styles.neonLayer,
                      {
                        opacity: iconGlow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.45],
                        }),
                        transform: [{ scale: 1.2 }],
                      },
                    ]}
                  >
                    <UpvoteIcon fill={vote === 1 ? "#FF7A18" : "transparent"} />
                  </Animated.View>

                  {/* BLOOM */}
                  <Animated.View
                    style={[
                      styles.neonLayer,
                      {
                        opacity: iconGlow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.18],
                        }),
                        transform: [{ scale: 1.5 }],
                      },
                    ]}
                  >
                    <UpvoteIcon fill={vote === 1 ? "#FF7A18" : "transparent"} />
                  </Animated.View>

                  {/* REAL ICON */}
                  <UpvoteIcon fill={vote === 1 ? upvotePulseFill : "#999"} />
                </View>
              </Pressable>
            </Animated.View>

            {/* SCORE */}
            <Animated.Text
              style={[
                styles.voteCount,
                { transform: [{ scale: scoreScale }] },
              ]}
            >
              {score}
            </Animated.Text>

            {/* DOWNVOTE */}
            <Animated.View
              style={{
                transform: [
                  { scale: downvoteScale },
                  {
                    rotate: downvoteTilt.interpolate({
                      inputRange: [-8, 8],
                      outputRange: ["-8deg", "8deg"],
                    }),
                  },
                ],
              }}
            >
              <Pressable onPress={() => handleVote(-1)}>
                <View style={styles.iconWrapper}>
                  {/* NEON */}
                  <Animated.View
                    style={[
                      styles.neonLayer,
                      {
                        opacity: iconGlow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.45],
                        }),
                        transform: [{ scale: 1.2 }],
                      },
                    ]}
                  >
                    <DownvoteIcon
                      fill={vote === -1 ? "#00A2FF" : "transparent"}
                    />
                  </Animated.View>

                  {/* BLOOM */}
                  <Animated.View
                    style={[
                      styles.neonLayer,
                      {
                        opacity: iconGlow.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.18],
                        }),
                        transform: [{ scale: 1.5 }],
                      },
                    ]}
                  >
                    <DownvoteIcon
                      fill={vote === -1 ? "#00A2FF" : "transparent"}
                    />
                  </Animated.View>

                  {/* REAL ICON */}
                  <DownvoteIcon
                    fill={vote === -1 ? downvotePulseFill : "#999"}
                  />
                </View>
              </Pressable>
            </Animated.View>
          </Animated.View>

          {/* CENTER LOGO */}
          <View style={styles.centerLogoWrapper}>
            <Image
              source={require("../assets/images/fuelsync.png")}
              style={styles.centerLogo}
              resizeMode="contain"
            />
          </View>

          {/* RIGHT ACTIONS */}
          <View style={styles.rightActions}>
            <Pressable onPress={onOpenComments} style={styles.iconButton}>
              <Text style={styles.icon}>💬</Text>
              <Text style={styles.iconLabel}>{meal.comments}</Text>
            </Pressable>

            <Pressable style={styles.iconButton}>
              <Text style={styles.icon}>{meal.saved ? "🔖" : "📑"}</Text>
            </Pressable>

            <Pressable style={styles.iconButton}>
              <Text style={styles.icon}>⋯</Text>
            </Pressable>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{meal.title}</Text>

        {/* TAGS */}
        <View style={styles.tagsRow}>
          {meal.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        {/* META */}
        <Text style={styles.meta}>
          Posted by @{meal.user.username} · {formatTimeAgo(meal.createdAt)}
        </Text>
      </View>
    </Animated.View>
  );
}

function formatTimeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#fff",
  },

  imageWrapper: {
    width: "100%",
    height: "65%",
    backgroundColor: "#e9ecef",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    flex: 1,
    paddingTop: 6,
  },

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  voteGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  iconWrapper: {
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  neonLayer: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  voteCount: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    minWidth: 28,
    textAlign: "center",
  },

  centerLogoWrapper: {
    flex: 1,
    alignItems: "center",
  },

  centerLogo: {
    width: 80,
    height: 80,
  },

  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  icon: {
    fontSize: 18,
  },

  iconLabel: {
    fontSize: 14,
    color: "#444",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: 14,
    marginTop: 4,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    paddingHorizontal: 14,
    marginTop: 6,
  },

  tag: {
    backgroundColor: "#F1F3F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  tagText: {
    fontSize: 12,
    color: "#444",
  },

  meta: {
    fontSize: 13,
    color: "#666",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
});
