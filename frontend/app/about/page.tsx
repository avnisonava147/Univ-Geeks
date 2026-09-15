import Hero from "../../components/About/Hero";
import WhoWeAre from "../../components/About/WhoWeAre";
import OurPurpose from "../../components/About/OurPurpose";
import WhatYouGet from "../../components/About/WhatYouGet";
import WhyChooseUs from "../../components/About/WhyChooseUs";
import OurStory from "../../components/About/OurStory";
import Founder from "../../components/About/Founder";
import Stats from "../../components/About/Stats";
import ContactSection from "../../components/About/ContactSection";
import CallToAction from "../../components/About/CallToAction";

/*
============================================================
UNIV-GEEKS ABOUT PAGE CONTENT
============================================================

Edit the information in this object when the real content
is ready.

You don't need to change the individual components just
because the text changes.
*/

const aboutContent = {
  hero: {
    title: "About UNIV-GEEKS",
    tagline:
      "Making exam preparation simpler with notes, PYQs and useful study resources.",
    badge: "Learn. Prepare. Succeed.",
  },

  whoWeAre: {
    heading: "Who We Are",
    description:
      "UNIV-GEEKS is a student-focused learning platform created to make academic resources easier to find, understand and use. We bring together notes, previous year questions and other useful study materials for students of Classes 10 to 12.",
  },

  purpose: {
    heading: "Our Purpose",
    description:
      "Our mission is to make quality study resources easily accessible to students and help them prepare for their exams with better organization, less confusion and more confidence.",
  },

  whatYouGet: {
    heading: "What Students Will Get",
    description:
      "Everything students need to make their exam preparation more organized and accessible.",
    features: [
      {
        title: "Previous Year Questions",
        description:
          "Practice real exam questions and understand the types of questions asked.",
        icon: "📝",
      },
      {
        title: "Easy-to-Understand Notes",
        description:
          "Find organized notes that make revision and concept understanding easier.",
        icon: "📚",
      },
      {
        title: "Multiple Boards",
        description:
          "Study resources designed to support students from different educational boards.",
        icon: "🎓",
      },
      {
        title: "Free Access",
        description:
          "Access useful learning resources without unnecessary barriers.",
        icon: "🆓",
      },
      {
        title: "Mobile Friendly",
        description:
          "Study comfortably from your phone, tablet or laptop wherever you are.",
        icon: "📱",
      },
    ],
  },

  whyChooseUs: {
    heading: "Why Choose Us?",
    description:
      "We focus on making studying simple, organized and accessible.",
    points: [
      {
        title: "Verified Content",
        description:
          "We aim to provide reliable and useful study material for students.",
      },
      {
        title: "Updated Regularly",
        description:
          "Resources can be improved and updated according to students' needs.",
      },
      {
        title: "Clean & Simple UI",
        description:
          "A simple interface helps students find what they need without unnecessary distractions.",
      },
    ],
  },

  story: {
    heading: "Our Story",
    paragraphs: [
      "Preparing for exams can become difficult when useful study material is scattered across different places.",
      "UNIV-GEEKS was created with a simple idea: bring important academic resources together in one organized platform.",
      "From notes and previous year questions to other useful resources, our goal is to create a place where students can focus more on learning and less on searching.",
    ],
  },

  founder: {
    heading: "Meet the Founder",
    name: "Founder Name",
    role: "Founder, UNIV-GEEKS",
    bio:
      "UNIV-GEEKS was started with the vision of making academic resources easier and more accessible for school students.",
    image: "",
  },

  stats: [
    {
      number: "10+",
      label: "Subjects",
    },
    {
      number: "500+",
      label: "Study Resources",
    },
    {
      number: "1000+",
      label: "Students",
    },
    {
      number: "5+",
      label: "Boards",
    },
  ],

  contact: {
    heading: "Have Feedback or Suggestions?",
    description:
      "We would love to hear from students and help make UNIV-GEEKS better.",
    email: "contact@univ-geeks.com",
    buttonText: "Email Us",
  },

  cta: {
    heading: "Ready to Start Studying?",
    description:
      "Explore our study resources and make your exam preparation easier.",
    notesButton: "Browse Notes",
    notesLink: "/notes",
    pyqButton: "Explore PYQs",
    pyqLink: "/pyqs",
  },
};


/*
============================================================
ABOUT PAGE
============================================================
*/

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">

      {/* 1. Hero */}
      <Hero {...aboutContent.hero} />

      {/* 2. Who We Are */}
      <WhoWeAre {...aboutContent.whoWeAre} />

      {/* 3. Our Purpose */}
      <OurPurpose {...aboutContent.purpose} />

      {/* 4. What Students Will Get */}
      <WhatYouGet {...aboutContent.whatYouGet} />

      {/* 5. Why Choose Us */}
      <WhyChooseUs {...aboutContent.whyChooseUs} />

      {/* 6. Our Story */}
      <OurStory {...aboutContent.story} />

      {/* 7. Founder */}
      <Founder {...aboutContent.founder} />

      {/* 8. Stats */}
      <Stats stats={aboutContent.stats} />

      {/* 9. Contact / Feedback */}
      <ContactSection {...aboutContent.contact} />

      {/* 10. Call To Action */}
      <CallToAction {...aboutContent.cta} />

    </main>
  );
}