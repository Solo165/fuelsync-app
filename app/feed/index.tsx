import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import MealCard from "@/components/MealCard";
import CommentSheet from "@/components/CommentSheet";
import { meals } from "@/data/mockMeals";
import { Meal } from "@/types/meal";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function FeedScreen() {
  const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
  const insets = useSafeAreaInsets();

  // Adjust how far down the feed starts
  const TOP_OFFSET = insets.top * 0.4;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlashList
        contentContainerStyle={{
          paddingTop: TOP_OFFSET,
          backgroundColor: "#000",
        }}
        data={meals}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onOpenComments={() => setActiveMeal(item)}
            isCommentOpen={!!activeMeal}   // ← CRITICAL for shrink/dim animation
          />
        )}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />

      {activeMeal && (
        <CommentSheet
          comments={activeMeal.commentList}
          onClose={() => setActiveMeal(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // keeps status bar visible
  },
});
