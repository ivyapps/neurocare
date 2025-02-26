import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  useColorScheme
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type Category = 'all' | 'podcasts' | 'videos' | 'guides' | 'stories';

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'videos', label: 'Videos' },
    { id: 'guides', label: 'Guides' },
    { id: 'stories', label: 'Stories' },
  ];

  const resources = [
    {
      title: "What is Autism?",
      description: "Breaking myths in Cameroon",
      type: "Audio",
      languages: ["English", "French"],
      icon: "play",
      color: "#dbeafe",
      textColor: "#3b82f6"
    },
    {
      title: "Sensory Play Guide",
      description: "Activities for sensory development",
      type: "PDF",
      languages: ["French"],
      icon: "book-open",
      color: "#dcfce7",
      textColor: "#16a34a"
    },
    {
      title: "Traditional & Modern Approaches",
      description: "Combining healing practices",
      type: "Article",
      languages: ["English", "Pidgin"],
      icon: "book-open",
      color: "#fef3c7",
      textColor: "#d97706"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerSection}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Learn</Text>
        <Text style={[styles.screenSubtitle, { color: colors.muted }]}>
          Educational resources for neurodiversity
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
            onPress={() => setActiveCategory(category.id as Category)}
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

      {/* Featured Content */}
      <View style={styles.featuredContainer}>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/400/200' }}
          style={styles.featuredImage}
          imageStyle={styles.featuredImageStyle}
        >
          <View style={styles.featuredOverlay}>
            <View style={[styles.newBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
            <Text style={styles.featuredTitle}>Understanding Meltdowns</Text>
            <Text style={styles.featuredDescription}>Responding with love and support</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Feather name="play" size={20} color={colors.primary} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Content List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Resources</Text>

        {resources.map((item, index) => (
          <View key={index} style={[styles.contentItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.contentItemHeader}>
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Feather name={item.icon as any} size={18} color={item.textColor} />
              </View>
              <View style={styles.contentInfo}>
                <Text style={[styles.contentTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.contentDescription, { color: colors.muted }]}>{item.description}</Text>
              </View>
            </View>
            <View style={styles.contentItemFooter}>
              <View style={styles.languagesContainer}>
                {item.languages.map((lang, i) => (
                  <View key={i} style={styles.languageTag}>
                    <Text style={styles.languageText}>{lang}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={{ color: colors.primary }}>
                  {item.type === "Audio" ? "Listen" : "View"}
                </Text>
                <Feather name="chevron-right" size={16} color={colors.primary} />
              </TouchableOpacity>
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
  featuredContainer: {
    height: 180,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  featuredImageStyle: {
    borderRadius: 16,
  },
  featuredOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  playButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contentItemHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 12,
  },
  contentItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: 4,
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
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
