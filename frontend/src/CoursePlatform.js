import React, { useState } from 'react';

const CoursePlatform = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState({});

  const courses = [
    {
      id: 'java-fundamentals',
      title: 'Java Programming Fundamentals',
      instructor: 'Dr. Sarah Mitchell',
      price: 89.99,
      duration: '8 weeks',
      level: 'Beginner',
      students: 12847,
      rating: 4.8,
      description: 'Master the fundamentals of Java programming with hands-on projects and real-world examples.',
      category: 'Programming',
      icon: '☕'
    },
    {
      id: 'react-mastery',
      title: 'Complete React Developer Course',
      instructor: 'Alex Johnson',
      price: 129.99,
      duration: '12 weeks',
      level: 'Intermediate',
      students: 8934,
      rating: 4.9,
      description: 'Build modern web applications with React, Redux, and the latest JavaScript features.',
      category: 'Web Development',
      icon: '⚛️'
    },
    {
      id: 'python-data-science',
      title: 'Python for Data Science',
      instructor: 'Prof. Maria Rodriguez',
      price: 149.99,
      duration: '10 weeks',
      level: 'Intermediate',
      students: 15623,
      rating: 4.7,
      description: 'Learn Python programming for data analysis, machine learning, and visualization.',
      category: 'Data Science',
      icon: '🐍'
    },
    {
      id: 'kubernetes-basics',
      title: 'Kubernetes Fundamentals',
      instructor: 'Mike Chen',
      price: 99.99,
      duration: '6 weeks',
      level: 'Advanced',
      students: 5432,
      rating: 4.6,
      description: 'Deploy and manage containerized applications with Kubernetes orchestration.',
      category: 'DevOps',
      icon: '☸️'
    },
    {
      id: 'spring-boot-microservices',
      title: 'Spring Boot Microservices',
      instructor: 'Jennifer Liu',
      price: 159.99,
      duration: '14 weeks',
      level: 'Advanced',
      students: 7821,
      rating: 4.8,
      description: 'Build scalable microservices architecture using Spring Boot, Kafka, and Docker.',
      category: 'Backend Development',
      icon: '🍃'
    },
    {
      id: 'aws-cloud-practitioner',
      title: 'AWS Cloud Practitioner',
      instructor: 'David Thompson',
      price: 79.99,
      duration: '5 weeks',
      level: 'Beginner',
      students: 11234,
      rating: 4.5,
      description: 'Get started with Amazon Web Services and prepare for the Cloud Practitioner certification.',
      category: 'Cloud Computing',
      icon: '☁️'
    }
  ];

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleBuyCourse = async (course) => {
    setLoading(prev => ({ ...prev, [`buy_${course.id}`]: true }));
    const userId = generateUserId();
    
    try {
      const response = await fetch('http://localhost:8081/api/events/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          userId: userId,
          price: course.price
        }),
      });

      if (response.ok) {
        showNotification(`🎉 Purchase initiated for "${course.title}"! Processing payment...`);
      } else {
        showNotification('❌ Purchase failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('🔌 Connection error. Please check if services are running.');
    } finally {
      setLoading(prev => ({ ...prev, [`buy_${course.id}`]: false }));
    }
  };

  const handleEnrollCourse = async (course, enrollmentType) => {
    setLoading(prev => ({ ...prev, [`${enrollmentType}_${course.id}`]: true }));
    const userId = generateUserId();
    
    try {
      const response = await fetch('http://localhost:8081/api/events/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
          userId: userId,
          enrollmentType: enrollmentType
        }),
      });

      if (response.ok) {
        const typeEmoji = enrollmentType === 'free-trial' ? '🎯' : '📖';
        showNotification(`${typeEmoji} Enrolled in "${course.title}" as ${enrollmentType.replace('-', ' ')} student!`);
      } else {
        showNotification('❌ Enrollment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('🔌 Connection error. Please check if services are running.');
    } finally {
      setLoading(prev => ({ ...prev, [`${enrollmentType}_${course.id}`]: false }));
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {notification && (
        <div className="fixed top-4 right-4 bg-white border-l-4 border-blue-500 text-gray-800 px-6 py-4 rounded-lg shadow-lg z-50 notification-slide-in max-w-md">
          <p className="font-medium">{notification}</p>
        </div>
      )}

      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  EduTech Platform
                </h1>
                <p className="text-gray-600 text-sm">Learn. Grow. Succeed.</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Browse Courses</button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">My Learning</button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Instructors</button>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 btn-primary">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Career with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Expert-Led Courses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 students learning cutting-edge technologies from industry professionals. 
            Start your journey today with our comprehensive curriculum.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden course-card-hover border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <div className="text-6xl mb-2">{course.icon}</div>
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">{course.category}</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600 ml-4">${course.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{course.description}</p>
                
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">👨‍🏫</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">⏱️</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">⭐</span>
                      <span className="font-semibold text-yellow-600">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">👥</span>
                    <span>{course.students.toLocaleString()} students enrolled</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleBuyCourse(course)}
                    disabled={loading[`buy_${course.id}`]}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading[`buy_${course.id}`] ? 'Processing...' : `Buy Now - $${course.price}`}
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEnrollCourse(course, 'free-trial')}
                      disabled={loading[`free-trial_${course.id}`]}
                      className="flex-1 border-2 border-green-500 text-green-600 py-2.5 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading[`free-trial_${course.id}`] ? 'Enrolling...' : 'Free Trial'}
                    </button>
                    <button
                      onClick={() => handleEnrollCourse(course, 'audit')}
                      disabled={loading[`audit_${course.id}`]}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading[`audit_${course.id}`] ? 'Enrolling...' : 'Audit Course'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-20 text-center bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers through our courses.
            Every click generates real-time analytics tracked through our Kafka-powered system.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">📊 Real-time Analytics</span>
            <span className="flex items-center">⚡ Kafka Event Streaming</span>
            <span className="flex items-center">📈 Prometheus Metrics</span>
            <span className="flex items-center">🔍 Grafana Dashboards</span>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <h3 className="text-2xl font-bold">EduTech Platform</h3>
            </div>
            <p className="text-gray-400 mb-4">Empowering learners worldwide with cutting-edge technology education</p>
            <p className="text-gray-500 text-sm">Built with React • Spring Boot • Kafka • Prometheus • Grafana</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursePlatform;