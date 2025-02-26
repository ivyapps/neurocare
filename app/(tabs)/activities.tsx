import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type ActivityCategory = 'all' | 'communication' | 'sensory' | 'social' | 'motor';

export default function ActivitiesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'communication', label: 'Communication' },
    { id: 'sensory', label: 'Sensory' },
    { id: 'social', label: 'Social' },
    { id: 'motor', label: 'Motor' },
  ];

  const activities = [
    {
      title: "Sensory Bottle",
      description: "Create a calming sensory tool",
      age: "Ages 3-8",
      time: "20 min",
      color: "#c084fc",
      icon: "play"
    },
    {
      title: "Taking Turns Game",
      description: "Practice social skills with cards",
      age: "Ages 4-10",
      time: "30 min",
      color: "#22c55e",
      icon: "users"
    },
    {
      title: "Sound Matching",
      description: "Identify everyday sounds",
      age: "Ages 2-6",
      time: "15 min",
      color: "#f59e0b",
      icon: "play"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerSection}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Activities</Text>
        <Text style={[styles.screenSubtitle, { color: colors.muted }]}>
          Guided exercises for development
        </Text>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              activeCategory === category.id ?
                { backgroundColor: colors.primary } :
                { backgroundColor: colors.cardBackground }
            ]}
            onPress={() => setActiveCategory(category.id as ActivityCategory)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id ?
                  { color: '#fff' } :
                  { color: colors.muted }
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Activity */}
      <View style={styles.featuredActivityContainer}>
        <View style={styles.featuredActivity}>
          <View style={styles.featuredHeader}>
            <View style={[styles.featuredBadge, { backgroundColor: '#fff' }]}>
              <Text style={[styles.featuredBadgeText, { color: colors.primary }]}>Featured</Text>
            </View>
            <View style={styles.featuredMeta}>
              <View style={styles.featuredMetaItem}>
                <Text style={styles.featuredMetaText}>Ages 2-5</Text>
              </View>
              <View style={styles.featuredMetaItem}>
                <Text style={styles.featuredMetaText}>15 min</Text>
              </View>
            </View>
          </View>
          <Text style={styles.featuredTitle}>Communication Cards</Text>
          <Text style={styles.featuredDescription}>
            Help your child build vocabulary with these simple picture-to-word matching activities.
          </Text>
          <TouchableOpacity style={styles.featuredButton}>
            <Text style={[styles.featuredButtonText, { color: colors.primary }]}>Start Activity</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Activity List */}
      <View style={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <View key={index} style={[styles.activityItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.activityContent}>
              <View style={[styles.activityIconContainer, { backgroundColor: activity.color }]}>
                <Feather name={activity.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.activityDetails}>
                <View style={styles.activityHeader}>
                  <Text style={[styles.activityTitle, { color: colors.text }]}>{activity.title}</Text>
                  <View style={styles.activityAge}>
                    <Text style={styles.activityAgeText}>{activity.age}</Text>
                  </View>
                </View>
                <Text style={[styles.activityDescription, { color: colors.muted }]}>{activity.description}</Text>
                <View style={styles.activityFooter}>
                  <Text style={[styles.activityTime, { color: colors.muted }]}>{activity.time}</Text>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={{ color: colors.primary, fontWeight: '500', marginRight: 4 }}>Start</Text>
                    <Feather name="chevron-right" size={16} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 16,
  },
  categoriesContainer: {
    paddingVertical: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuredActivityContainer: {
    marginBottom: 24,
  },
  featuredActivity: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 20,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featuredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  featuredMetaItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredMetaText: {
    color: '#fff',
    fontSize: 12,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  featuredButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  featuredButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activitiesContainer: {
    gap: 16,
  },
  activityItem: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityContent: {
    flexDirection: 'row',
    gap: 16,
  },
  activityIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityAge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activityAgeText: {
    fontSize: 12,
    color: '#4b5563',
  },
  activityDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTime: {
    fontSize: 12,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
