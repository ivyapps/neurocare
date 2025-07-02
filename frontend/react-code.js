import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Users,
  Play,
  MapPin,
  BarChart2,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

const NeuroCareApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Tab content components
  const tabs = {
    home: <HomeScreen />,
    learn: <LearnScreen />,
    community: <CommunityScreen />,
    activities: <ActivitiesScreen />,
    services: <ServicesScreen />
  };

  // Tab configuration
  const tabConfig = [
    { id: 'home', label: 'Home', icon: <Home size={22} /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen size={22} /> },
    { id: 'community', label: 'Community', icon: <Users size={22} /> },
    { id: 'activities', label: 'Activities', icon: <Play size={22} /> },
    { id: 'services', label: 'Services', icon: <MapPin size={22} /> }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* App Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow-sm z-10">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-xl w-10 h-10 flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">
            NeuroCare
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-500">
            <Search size={22} />
          </button>
          <button className="text-gray-500">
            <Bell size={22} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {tabs[activeTab]}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-16">
        <div className="flex justify-around items-center h-full px-1">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center rounded-xl py-1 px-3 ${
                activeTab === tab.id
                  ? 'text-blue-500 bg-blue-50'
                  : 'text-gray-400'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Home Screen
const HomeScreen = () => {
  return (
    <div className="p-4">
      {/* Welcome Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to NeuroCare</h2>
        <p className="text-gray-600 mt-1">Supporting neurodiversity in Cameroon</p>
      </section>

      {/* Featured Card */}
      <section className="mb-6">
        <div className="bg-blue-500 rounded-xl p-5 text-white">
          <h3 className="text-xl font-bold mb-2">Early Detection</h3>
          <p className="text-sm mb-4 opacity-90">Identify signs early and get the support your child needs</p>
          <button className="bg-white text-blue-600 rounded-lg py-2 px-4 text-sm font-medium">
            Take Assessment
          </button>
        </div>
      </section>

      {/* Quick Access */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Explore</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Education",
              description: "Learn about neurodiversity",
              icon: <BookOpen size={22} className="text-blue-500" />
            },
            {
              title: "Community",
              description: "Connect with families",
              icon: <Users size={22} className="text-blue-500" />
            },
            {
              title: "Activities",
              description: "Guided exercises",
              icon: <Play size={22} className="text-blue-500" />
            },
            {
              title: "Services",
              description: "Find specialists",
              icon: <MapPin size={22} className="text-blue-500" />
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex flex-col">
              <div className="bg-blue-50 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent & Recommended */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recommended</h3>
          <button className="text-blue-500 text-sm">See All</button>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Understanding Autism",
              type: "Podcast",
              duration: "8 min",
              language: "English",
              icon: <Play size={18} className="text-blue-500" />
            },
            {
              title: "Sensory Activities at Home",
              type: "Guide",
              duration: "5 min read",
              language: "French",
              icon: <BookOpen size={18} className="text-blue-500" />
            },
            {
              title: "Communication Techniques",
              type: "Video",
              duration: "12 min",
              language: "Pidgin",
              icon: <Play size={18} className="text-blue-500" />
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-50 rounded-lg w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">{item.type}</span>
                    <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                    <span className="text-xs text-gray-500">{item.duration}</span>
                  </div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {item.language}
                </span>
                <button className="text-blue-500 text-xs font-medium">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Learn Screen
const LearnScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Learn</h2>
      <p className="text-gray-600 mb-5">Educational resources for neurodiversity</p>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto py-2 mb-6 hide-scrollbar">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
          All
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Podcasts
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Videos
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Guides
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Stories
        </button>
      </div>

      {/* Featured Content */}
      <div className="relative rounded-2xl overflow-hidden shadow mb-6 aspect-video">
        <img src="/api/placeholder/400/200" alt="Featured content" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full w-fit mb-2">NEW</span>
          <h3 className="text-white font-bold text-xl">Understanding Meltdowns</h3>
          <p className="text-white text-sm opacity-90 mt-1">Responding with love and support</p>
        </div>
        <button className="absolute right-4 bottom-4 bg-white text-blue-600 rounded-full p-2 shadow">
          <Play size={20} />
        </button>
      </div>

      {/* Content List */}
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Popular Resources</h3>

        {[
          {
            title: "What is Autism?",
            description: "Breaking myths in Cameroon",
            type: "Audio",
            languages: ["English", "French"],
            icon: <Play size={18} />,
            color: "bg-blue-100 text-blue-600"
          },
          {
            title: "Sensory Play Guide",
            description: "Activities for sensory development",
            type: "PDF",
            languages: ["French"],
            icon: <BookOpen size={18} />,
            color: "bg-green-100 text-green-600"
          },
          {
            title: "Traditional & Modern Approaches",
            description: "Combining healing practices",
            type: "Article",
            languages: ["English", "Pidgin"],
            icon: <BookOpen size={18} />,
            color: "bg-amber-100 text-amber-600"
          }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-3 mb-2">
              <div className={`${item.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                {item.languages.map((lang, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {lang}
                  </span>
                ))}
              </div>
              <button className="text-blue-500 text-sm font-medium flex items-center">
                <span>{item.type === "Audio" ? "Listen" : "View"}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Community Screen
const CommunityScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Community</h2>
      <p className="text-gray-600 mb-5">Connect with other families</p>

      {/* Success Stories Section - Moved to the top for prominence */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Success Stories</h3>
          <button className="text-blue-500 text-sm">See All</button>
        </div>

        <div className="relative mb-4 rounded-xl overflow-hidden shadow-sm h-40">
          <img src="/api/placeholder/400/200" alt="Featured story" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-lg">The Ndifon Family</h3>
            <p className="text-white text-sm opacity-90">How they helped their child thrive in school</p>
            <button className="mt-2 bg-white text-blue-600 rounded-lg py-1 px-4 text-sm font-medium w-fit">
              Read Story
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Adama's Journey",
              description: "From non-verbal to confident communicator",
              image: "/api/placeholder/200/150"
            },
            {
              title: "Bella's Progress",
              description: "Finding strength through community support",
              image: "/api/placeholder/200/150"
            }
          ].map((story, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-24 bg-gray-100">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-gray-800 text-sm mb-1">{story.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold">NC</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-gray-500 text-sm">
            Share your experience...
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto py-2 mb-5 hide-scrollbar">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
          All Posts
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Questions
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Stories
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Support
        </button>
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {[
          {
            author: "Marie N.",
            avatar: "MN",
            time: "2 days ago",
            title: "Handling cultural stigma",
            content: "My child was recently diagnosed with autism, and I'm struggling with how to explain this to my extended family who have traditional beliefs...",
            replies: 32,
            likes: 18,
            tag: "Question",
            tagColor: "bg-blue-100 text-blue-600"
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
            tagColor: "bg-green-100 text-green-600"
          }
        ].map((post, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">{post.avatar}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">{post.author}</h4>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full h-fit ${post.tagColor}`}>
                {post.tag}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{post.content}</p>
            <div className="flex justify-between items-center text-xs">
              <div className="flex gap-3">
                <span className="text-gray-500">{post.replies} replies</span>
                <span className="text-gray-500">{post.likes} likes</span>
              </div>
              <button className="text-blue-500 font-medium">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activities Screen
const ActivitiesScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Activities</h2>
      <p className="text-gray-600 mb-5">Guided exercises for development</p>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto py-2 mb-6 hide-scrollbar">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
          All
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Communication
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Sensory
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Social
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm">
          Motor
        </button>
      </div>

      {/* Featured Activity */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow p-5 text-white mb-6">
        <div className="flex justify-between mb-3">
          <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full">Featured</span>
          <div className="flex gap-2">
            <span className="bg-blue-400/30 text-white text-xs px-2 py-1 rounded">Ages 2-5</span>
            <span className="bg-blue-400/30 text-white text-xs px-2 py-1 rounded">15 min</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">Communication Cards</h3>
        <p className="text-sm opacity-90 mb-4">Help your child build vocabulary with these simple picture-to-word matching activities.</p>
        <button className="bg-white text-blue-600 w-full rounded-lg py-2.5 text-sm font-semibold">
          Start Activity
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {[
          {
            title: "Sensory Bottle",
            description: "Create a calming sensory tool",
            age: "Ages 3-8",
            time: "20 min",
            color: "bg-purple-500",
            icon: <Play size={24} className="text-white" />
          },
          {
            title: "Taking Turns Game",
            description: "Practice social skills with cards",
            age: "Ages 4-10",
            time: "30 min",
            color: "bg-green-500",
            icon: <Users size={24} className="text-white" />
          },
          {
            title: "Sound Matching",
            description: "Identify everyday sounds",
            age: "Ages 2-6",
            time: "15 min",
            color: "bg-amber-500",
            icon: <Play size={24} className="text-white" />
          }
        ].map((activity, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-3">
              <div className={`${activity.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                {activity.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-gray-800">{activity.title}</h3>
                  <div className="flex gap-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{activity.age}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{activity.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <button className="text-blue-500 text-sm font-medium flex items-center">
                    <span>Start</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Services Screen
const ServicesScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Services</h2>
      <p className="text-gray-600 mb-5">Find specialists and support</p>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search specialists or services..."
            className="w-full bg-gray-100 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
        <div className="flex gap-2">
          <select className="bg-gray-100 rounded-lg text-sm py-2 px-3 flex-1 border-0">
            <option>All Specialists</option>
            <option>Psychologists</option>
            <option>Speech Therapists</option>
            <option>Special Educators</option>
          </select>
          <select className="bg-gray-100 rounded-lg text-sm py-2 px-3 flex-1 border-0">
            <option>All Locations</option>
            <option>Yaoundé</option>
            <option>Douala</option>
            <option>Bamenda</option>
          </select>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4 mb-6">
        {[
          {
            name: "Dr. Mbarga",
            title: "Psychologist",
            description: "Specializes in autism assessment and behavioral therapy for children ages 2-12.",
            location: "Douala",
            languages: ["French", "English"],
            rating: 4.8,
            reviews: 24,
            locationColor: "bg-blue-100 text-blue-600"
          },
          {
            name: "Bright Start Learning Center",
            title: "Inclusive School",
            description: "Special education programs and therapeutic services for children with diverse needs.",
            location: "Yaoundé",
            languages: ["French", "English"],
            rating: 4.6,
            reviews: 18,
            locationColor: "bg-green-100 text-green-600"
          }
        ].map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">{service.name}</h3>
                <p className="text-xs text-gray-500">{service.title}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${service.locationColor}`}>
                {service.location}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3">{service.description}</p>
            <div className="flex mb-3 gap-1">
              {service.languages.map((lang, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-1">{service.rating}</span>
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({service.reviews})</span>
              </div>
              <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded-lg">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Teleconsultation */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-4 text-white">
        <h3 className="font-bold text-lg mb-2">Online Consultation</h3>
        <p className="text-sm opacity-90 mb-4">Connect with specialists remotely from anywhere in Cameroon.</p>
        <button className="bg-white text-blue-600 w-full rounded-lg py-2.5 text-sm font-medium">
          Find Online Services
        </button>
      </div>
    </div>
  );
};

export default NeuroCareApp;
