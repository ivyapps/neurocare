import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  useColorScheme
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type PostCategory = 'all' | 'questions' | 'stories' | 'support';

export default function CommunityScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState<PostCategory>('all');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'questions', label: 'Questions' },
    { id: 'stories', label: 'Stories' },
    { id: 'support', label: 'Support' },
  ];

  const successStories = [
    {
      title: "The Ndifon Family",
      description: "How they helped their child thrive in school",
      image: "https://picsum.photos/400/200"
    },
    {
      title: "Adama's Journey",
      description: "From non-verbal to confident communicator",
      image: "https://picsum.photos/200/150"
    },
    {
      title: "Bella's Progress",
      description: "Finding strength through community support",
      image: "https://picsum.photos/200/150"
    }
  ];

  const posts = [
    {
      author: "Marie N.",
      avatar: "MN",
      time: "2 days ago",
      title: "Handling cultural stigma",
      content: "My child was recently diagnosed with autism, and I'm struggling with how to explain this to my extended family who have traditional beliefs...",
      replies: 32,
      likes: 18,
      tag: "Question",
      tagColor: "#dbeafe",
      tagTextColor: "#3b82f6"
    },
    {
      author: "Jean P.",
      avatar: "JP",
      time: "5 days ago",
      title: "Activities that worked for us",
      content: "I wanted to share some activities that have really helped my 6-year-old son who has sensory processing differences. We've been doing these daily...",
      replies: 18,
      likes: 24,
      tag: "Success",
      tagColor: "#dcfce7",
      tagTextColor: "#16a34a"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerSection}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Community</Text>
        <Text style={[styles.screenSubtitle, { color: colors.muted }]}>
          Connect with other families
        </Text>
      </View>

      {/* Success Stories Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Success Stories</Text>
          <TouchableOpacity>
            <Text style={{ color: colors.primary }}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Story */}
        <View style={styles.featuredStoryContainer}>
          <ImageBackground
            source={{ uri: successStories[0].image }}
            style={styles.featuredStoryImage}
            imageStyle={styles.featuredStoryImageStyle}
          >
            <View style={styles.featuredStoryOverlay}>
              <Text style={styles.featuredStoryTitle}>{successStories[0].title}</Text>
              <Text style={styles.featuredStoryDescription}>{successStories[0].description}</Text>
              <TouchableOpacity style={styles.readStoryButton}>
                <Text style={[styles.readStoryButtonText, { color: colors.primary }]}>Read Story</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Story Grid */}
        <View style={styles.storyGrid}>
          {successStories.slice(1).map((story, index) => (
            <View key={index} style={[styles.storyGridItem, { backgroundColor: colors.cardBackground }]}>
              <ImageBackground
                source={{ uri: story.image }}
                style={styles.storyGridImage}
              />
              <View style={styles.storyGridContent}>
                <Text style={[styles.storyGridTitle, { color: colors.text }]}>{story.title}</Text>
                <Text style={[styles.storyGridDescription, { color: colors.muted }]} numberOfLines={2}>
                  {story.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Create Post */}
      <View style={[styles.createPostContainer, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.createPostContent}>
          <View style={[styles.avatarCircle, { backgroundColor: `${colors.primary}20` }]}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>NC</Text>
          </View>
          <View style={[styles.createPostInput, { backgroundColor: `${colors.muted}10` }]}>
            <Text style={{ color: colors.muted }}>Share your experience...</Text>
          </View>
        </View>
      </View>

      {/* Post Categories */}
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
            onPress={() => setActiveCategory(category.id as PostCategory)}
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

      {/* Posts */}
      <View style={styles.postsContainer}>
        {posts.map((post, index) => (
          <View key={index} style={[styles.postItem, { backgroundColor: colors.cardBackground }]}>
            <View style={styles.postHeader}>
              <View style={styles.postAuthor}>
                <View style={[styles.avatarCircle, { backgroundColor: `${colors.primary}20` }]}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{post.avatar}</Text>
                </View>
                <View>
                  <Text style={[styles.authorName, { color: colors.text }]}>{post.author}</Text>
                  <Text style={[styles.postTime, { color: colors.muted }]}>{post.time}</Text>
                </View>
              </View>
              <View style={[styles.postTag, { backgroundColor: post.tagColor }]}>
                <Text style={{ color: post.tagTextColor, fontSize: 12 }}>{post.tag}</Text>
              </View>
            </View>
            <Text style={[styles.postTitle, { color: colors.text }]}>{post.title}</Text>
            <Text style={[styles.postContent, { color: colors.muted }]}>{post.content}</Text>
            <View style={styles.postFooter}>
              <View style={styles.postStats}>
                <Text style={[styles.statText, { color: colors.muted }]}>{post.replies} replies</Text>
                <Text style={[styles.statText, { color: colors.muted }]}>{post.likes} likes</Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: colors.primary, fontWeight: '500' }}>Read More</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredStoryContainer: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredStoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  featuredStoryImageStyle: {
    borderRadius: 12,
  },
  featuredStoryOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  featuredStoryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredStoryDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 8,
  },
  readStoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  readStoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  storyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storyGridItem: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  storyGridImage: {
    height: 96,
    width: '100%',
  },
  storyGridContent: {
    padding: 12,
  },
  storyGridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storyGridDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  createPostContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createPostInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoriesContainer: {
    paddingVertical: 8,
    marginBottom: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  postsContainer: {
    marginBottom: 16,
  },
  postItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  postTime: {
    fontSize: 12,
  },
  postTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
  },
});
