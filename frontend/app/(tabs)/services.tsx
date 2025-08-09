import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

type SpecialistType = 'all' | 'psychologist' | 'speech' | 'education';
type Location = 'all' | 'yaounde' | 'douala' | 'bamenda';

export default function ServicesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');
  const [specialistType, setSpecialistType] = useState<SpecialistType>('all');
  const [location, setLocation] = useState<Location>('all');

  const services = [
    {
      name: "Dr. Mbarga",
      title: "Psychologist",
      description: "Specializes in autism assessment and behavioral therapy for children ages 2-12.",
      location: "Douala",
      languages: ["French", "English"],
      rating: 4.8,
      reviews: 24,
      locationColor: "#dbeafe",
      locationTextColor: "#3b82f6"
    },
    {
      name: "Bright Start Learning Center",
      title: "Inclusive School",
      description: "Special education programs and therapeutic services for children with diverse needs.",
      location: "Yaoundé",
      languages: ["French", "English"],
      rating: 4.6,
      reviews: 18,
      locationColor: "#dcfce7",
      locationTextColor: "#16a34a"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerSection}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Services</Text>
        <Text style={[styles.screenSubtitle, { color: colors.muted }]}>
          Find specialists and support
        </Text>
      </View>

      {/* Search & Filter */}
      <View style={[styles.searchCard, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={18}
            color={colors.muted}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search specialists or services..."
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, { backgroundColor: `${colors.muted}10`, color: colors.text }]}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filtersContainer}>
          <View style={[styles.selectContainer, { backgroundColor: `${colors.muted}10` }]}>
            <Feather name="users" size={16} color={colors.muted} style={{ marginRight: 8 }} />
            <Text style={{ color: colors.text, flex: 1 }}>All Specialists</Text>
            <Feather name="chevron-down" size={16} color={colors.muted} />
          </View>

          <View style={[styles.selectContainer, { backgroundColor: `${colors.muted}10` }]}>
            <Feather name="map-pin" size={16} color={colors.muted} style={{ marginRight: 8 }} />
            <Text style={{ color: colors.text, flex: 1 }}>All Locations</Text>
            <Feather name="chevron-down" size={16} color={colors.muted} />
          </View>
        </View>
      </View>

      {/* Services List */}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={[styles.serviceItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.serviceHeader}>
              <View>
                <Text style={[styles.serviceName, { color: colors.text }]}>{service.name}</Text>
                <Text style={[styles.serviceTitle, { color: colors.muted }]}>{service.title}</Text>
              </View>
              <View style={[styles.locationBadge, { backgroundColor: service.locationColor }]}>
                <Text style={{ color: service.locationTextColor, fontSize: 12 }}>{service.location}</Text>
              </View>
            </View>

            <Text style={[styles.serviceDescription, { color: colors.muted }]}>
              {service.description}
            </Text>

            <View style={styles.languagesContainer}>
              {service.languages.map((language, i) => (
                <View key={i} style={styles.languageTag}>
                  <Text style={styles.languageText}>{language}</Text>
                </View>
              ))}
            </View>

            <View style={styles.serviceFooter}>
              <View style={styles.ratingContainer}>
                <Text style={[styles.ratingText, { color: colors.text }]}>{service.rating}</Text>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Feather
                      key={star}
                      name="star"
                      size={14}
                      color={star <= Math.floor(service.rating) ? "#f59e0b" : "#d1d5db"}
                      style={{ marginHorizontal: 1 }}
                    />
                  ))}
                </View>
                <Text style={[styles.reviewsText, { color: colors.muted }]}>
                  ({service.reviews})
                </Text>
              </View>

              <TouchableOpacity style={[styles.bookButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Teleconsultation Banner - Updated with brand colors*/}
      <LinearGradient
        colors={['#4A969B', '#A370A4']} // Teal to purple gradient matching logo colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.teleconsultBanner}
      >
        <Text style={styles.teleconsultTitle}>Online Consultation</Text>
        <Text style={styles.teleconsultDescription}>
          Connect with specialists remotely from anywhere in Cameroon.
        </Text>
        <TouchableOpacity style={styles.teleconsultButton}>
          <Text style={[styles.teleconsultButtonText, { color: '#4A969B' }]}>
            Find Online Services
          </Text>
        </TouchableOpacity>
      </LinearGradient>
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
  searchCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  selectContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  servicesContainer: {
    marginBottom: 24,
  },
  serviceItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  serviceTitle: {
    fontSize: 13,
  },
  locationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  languagesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  languageTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#4b5563',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewsText: {
    fontSize: 12,
    marginLeft: 4,
  },
  bookButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  teleconsultBanner: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  teleconsultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  teleconsultDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 16,
  },
  teleconsultButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  teleconsultButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
