import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function CopyMealScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Image Placeholder */}
      <View style={styles.imageContainer}>
        <Text style={styles.placeholder}>📸 Meal Image</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>FASI BOLO FOR DANYA</Text>

      {/* Story */}
      <Text style={styles.story}>
        "kai that shiii"
      </Text>

      {/* Tags */}
      <Text style={styles.tags}>
        strictly for monkeys
      </Text>

      {/* Ingredients */}
      <Text style={styles.sectionHeader}>Ingredients</Text>
      <View style={styles.box}>
        <Text style={styles.item}>• 1 cup mokey balls</Text>
        <Text style={styles.item}>• 4 mokey fuas</Text>
        <Text style={styles.item}>• 1 can smoky monkey shit</Text>
        <Text style={styles.item}>• Salt, pepper, chilli flakes</Text>
      </View>

      {/* Steps */}
      <Text style={styles.sectionHeader}>Steps</Text>
      <View style={styles.box}>
        <Text style={styles.item}>1. Fry eggs until soft.</Text>
        <Text style={styles.item}>2. Add rice and mix.</Text>
        <Text style={styles.item}>3. Add smoky tuna.</Text>
        <Text style={styles.item}>4. Season and serve.</Text>
      </View>

      {/* Macros */}
      <Text style={styles.sectionHeader}>Macros</Text>
      <View style={styles.box}>
        <Text style={styles.item}>🔥 620 calories</Text>
        <Text style={styles.item}>🍗 52g protein</Text>
        <Text style={styles.item}>🍚 55g carbs</Text>
        <Text style={styles.item}>🥑 18g fat</Text>
      </View>

      {/* Save Button */}
      <Link href="/" style={styles.button}>
        Save to My Meals
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  imageContainer: {
    height: 220,
    backgroundColor: "#e9ecef",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholder: { fontSize: 18, color: "#666" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  story: { fontSize: 16, color: "#444", marginBottom: 10 },
  tags: { fontSize: 14, color: "#777", marginBottom: 20 },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  item: { fontSize: 16, marginBottom: 6 },
  button: {
    backgroundColor: "#959595",
    color: "white",
    padding: 18,
    textAlign: "center",
    borderRadius: 12,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 40,
  },
});