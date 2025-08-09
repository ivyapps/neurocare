import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  useColorScheme,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

type Category = 'all' | 'podcasts' | 'videos' | 'guides' | 'stories';

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [modalVisible, setModalVisible] = useState(false);

  // We'll use placeholder images until you replace them with actual spectrum chart images
  const spectrumChartSmall = require('../../assets/images/neurodiversity-spectrum-small.png');
  const spectrumChartLarge = require('../../assets/images/neurodiversity-spectrum-large.png');

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

      {/* Neurodiversity Spectrum Chart */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>
            Neurodiversity Spectrum
          </Text>
          <TouchableOpacity style={[styles.infoButton, { backgroundColor: `${colors.primary}20` }]}>
            <Feather name="info" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Clickable Chart Image */}
        <TouchableOpacity
          style={styles.chartImageContainer}
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={spectrumChartSmall}
            style={styles.chartImage}
            resizeMode="contain"
          />
          <View style={styles.expandHint}>
            <Feather name="maximize-2" size={16} color="#fff" />
            <Text style={styles.expandText}>Tap to expand</Text>
          </View>
        </TouchableOpacity>
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

      {/* Content List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Helpful Resources
        </Text>

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

      {/* Modal for expanded chart */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
            <Image
              source={spectrumChartLarge}
              style={styles.expandedImage}
              resizeMode="contain"
            />
            <Text style={styles.modalCaption}>The Neurodiversity Spectrum</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 16,
  },
  // Chart styles
  chartContainer: {
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartImageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  expandHint: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  expandText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedImage: {
    width: '100%',
    height: '90%',
  },
  modalCaption: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  // Existing styles
  categoriesContainer: {
    paddingVertical: 12,
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
  section: {
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
    gap: 4,
  },
});
