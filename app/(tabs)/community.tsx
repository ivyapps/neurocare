import React, { useState } from 'react';

// --- Mock Data and Constants ---
const Colors = {
  light: {
    text: '#1f2937',
    background: '#E5F1F1',
    tint: '#4A969B',
    tabIconDefault: '#9ca3af',
    tabIconSelected: '#4A969B',
    cardBackground: '#ffffff',
    primary: '#4A969B',
    secondary: '#A370A4',
    muted: '#6b7280',
  },
  dark: {
    text: '#f9fafb',
    background: '#111827',
    tint: '#4A969B',
    tabIconDefault: '#6b7280',
    tabIconSelected: '#4A969B',
    cardBackground: '#1f2937',
    primary: '#4A969B',
    secondary: '#A370A4',
    muted: '#9ca3af',
  },
};

// --- Helper Components for Icons (replaces @expo/vector-icons) ---
const Feather = ({ name, size, color }) => {
  const icons = {
    'map-pin': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
    'chevron-right': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
    'message-square': <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  };
  return icons[name] || null;
};


// --- Main Component ---
export default function CommunityScreen() {
  const colorScheme = 'dark';
  const colors = Colors[colorScheme];

  // --- Mock Data ---
  const successStories = [
    {
      title: "The Ndifon Family",
      description: "How they helped their child thrive in school",
      image: "https://images.unsplash.com/photo-1576765689472-b5ef7b499323?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Eposi's Progress",
      description: "From non-verbal to confident communicator",
      image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop"
    },
     {
      title: "Soli's Journey",
      description: "Finding strength through community support",
      image: "https://images.unsplash.com/photo-1618840393439-052335535b44?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const regularPosts = [
    {
      author: "Marie N.",
      avatar: "https://placehold.co/40x40/A370A4/FFFFFF?text=M",
      time: "2 days ago",
      title: "Handling cultural stigma",
      content: "My child was recently diagnosed with autism, and I'm struggling with how to explain this to my extended family who have traditional beliefs...",
      replies: 12,
      tag: "Question",
    },
    {
      author: "Jean P.",
      avatar: "https://placehold.co/40x40/A370A4/FFFFFF?text=J",
      time: "5 days ago",
      title: "Activities that worked for us",
      content: "I wanted to share some activities that have really helped my 6-year-old son who has sensory processing differences. We've been doing these daily...",
      replies: 5,
      tag: "Tip",
    }
  ];

  return (
    <div style={{...styles.container, backgroundColor: colors.background}}>
      <div style={styles.headerSection}>
        <p style={{...styles.screenTitle, color: colors.text}}>Community</p>
      </div>

      {/* Find Families Nearby Section */}
      <a href="#" style={{...styles.findFamiliesCard, backgroundColor: colors.cardBackground, textDecoration: 'none'}}>
          <div style={{...styles.findFamiliesIconContainer, backgroundColor: `${colors.primary}20`}}>
            <Feather name="map-pin" size={24} color={colors.primary} />
          </div>
          <div style={styles.findFamiliesTextContainer}>
              <p style={{...styles.findFamiliesTitle, color: colors.text}}>Find Families Nearby</p>
              <p style={{...styles.findFamiliesSubtitle, color: colors.muted}}>Connect with families in your area</p>
          </div>
          <Feather name="chevron-right" size={20} color={colors.muted} />
      </a>

      {/* --- Success Stories Section (UPDATED to a Horizontal Scroll) --- */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={{...styles.sectionTitle, color: colors.text}}>Success Stories</p>
          <a href="#" style={{ color: colors.primary, textDecoration: 'none', fontSize: 14 }}>See All</a>
        </div>
        {/* UPDATED: The container is now a horizontal list */}
        <div style={styles.storiesContainer}>
            {successStories.map((story, index) => (
                <a href="#" key={index} style={{...styles.storyCard, backgroundColor: colors.cardBackground, textDecoration: 'none'}}>
                    <img src={story.image} style={styles.storyCardImage} alt={story.title} />
                    <div style={styles.storyCardContent}>
                      <p style={{...styles.storyCardTitle, color: colors.text}}>{story.title}</p>
                      <p style={{...styles.storyCardDescription, color: colors.muted}}>{story.description}</p>
                    </div>
                </a>
            ))}
        </div>
      </div>


      {/* Create Post Input */}
      <a href="#" style={{...styles.createPostContainer, backgroundColor: colors.cardBackground, textDecoration: 'none'}}>
          <div style={{...styles.avatarCircle, backgroundColor: colors.secondary}}>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>NC</p>
          </div>
          <p style={{...styles.createPostPlaceholder, color: colors.muted}}>Share your experience...</p>
      </a>

      {/* Posts Feed */}
      <div style={styles.postsContainer}>
        <p style={{...styles.sectionTitle, color: colors.text, marginBottom: 16, paddingLeft: 4 }}>Recent Posts</p>
        {regularPosts.map((post, index) => (
          <a href="#" key={index} style={{
              ...styles.postItem,
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBackground,
              textDecoration: 'none'
            }}>

            <div style={styles.postContentContainer}>
                <div style={styles.postHeader}>
                    <img src={post.avatar} style={styles.authorAvatar} alt={post.author} />
                    <p style={{...styles.authorInfo, color: colors.muted}}>
                        Posted by <span style={{ fontWeight: 'bold', color: colors.text }}>{post.author}</span> • {post.time}
                    </p>
                </div>
                <p style={{...styles.postTitle, color: colors.text}}>{post.title}</p>
                <p style={{...styles.postContent, color: colors.muted}}>{post.content}</p>

                <div style={styles.postFooter}>
                    <div style={{...styles.postTag, backgroundColor: `${colors.secondary}20`}}>
                        <p style={{ color: colors.secondary, fontSize: 12, fontWeight: '500' }}>
                          {post.tag}
                        </p>
                    </div>
                    <div style={styles.replyContainer}>
                        <Feather name="message-square" size={14} color={colors.muted} />
                        <p style={{...styles.replyText, color: colors.muted}}>{post.replies} replies</p>
                    </div>
                </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// --- Stylesheet ---
const styles = {
  container: {
    fontFamily: 'sans-serif',
  },
  headerSection: {
    padding: '16px 16px 8px 16px',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  findFamiliesCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 16px 24px 16px',
    padding: 12,
    borderRadius: 12,
  },
  findFamiliesIconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  findFamiliesTextContainer: {
    flex: 1,
  },
  findFamiliesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  findFamiliesSubtitle: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: '0 16px',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // UPDATED: Styles for the horizontal story list
  storiesContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 16px',
    gap: 12,
    overflowX: 'auto', // Makes the container scrollable horizontally
  },
  storyCard: {
    width: 170, // Fixed width for horizontal scrolling items
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 0, // Prevents items from shrinking when scrolling
    display: 'flex',
    flexDirection: 'column',
  },
  storyCardImage: {
    height: 96,
    width: '100%',
    objectFit: 'cover',
  },
  storyCardContent: {
    padding: 12,
    flex: 1,
  },
  storyCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storyCardDescription: {
    fontSize: 12,
    lineHeight: 1.4,
  },
  createPostContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: '0 16px 24px 16px',
    padding: 12,
    borderRadius: 12,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  createPostPlaceholder: {
    fontSize: 16,
  },
  postsContainer: {
    padding: '0 16px',
  },
  postItem: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  postContentContainer: {
    flex: 1,
    padding: '12px 16px',
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  authorInfo: {
    fontSize: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: 12,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
  },
  postFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  postTag: {
    padding: '4px 8px',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
};
