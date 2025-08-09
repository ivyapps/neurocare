import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router'; 
export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();//Initialize Router
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Welcome Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Welcome to NeuroCare</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>Supporting neurodiversity in Cameroon</Text>
      </View>

      {/* Featured Card */}
      <View style={styles.section}>
        <View style={[styles.featuredCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.cardTitle}>Early Detection</Text>
          <Text style={styles.cardDescription}>
            Identify signs early and get the support your child needs
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/questions')}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>Take Assessment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Explore Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore</Text>
        <View style={styles.grid}>
          {[
            {
              title: "Education",
              description: "Learn about neurodiversity",
              icon: "book-open"
            },
            {
              title: "Community",
              description: "Connect with families",
              icon: "users"
            },
            {
              title: "Activities",
              description: "Guided exercises",
              icon: "play"
            },
            {
              title: "Services",
              description: "Find specialists",
              icon: "map-pin"
            }
          ].map((item, index) => (
            <View key={index} style={[styles.gridItem, { backgroundColor: colors.cardBackground }]}>
              <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}20` }]}>
                <Feather name={item.icon as any} size={22} color={colors.primary} />
              </View>
              <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.itemDescription, { color: colors.muted }]}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>
      {}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  featuredCard: {
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  gridItem: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
  },
  recommendedItem: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recommendedItemHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recommendedItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  smallIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 6,
  },
  recommendedItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  languageTag: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  languageText: {
    fontSize: 12,
    color: '#4b5563',
  },
});

