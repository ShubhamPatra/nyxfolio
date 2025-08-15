import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = () => {
  const nameVariants = [
    "Shubham Patra", "Shubham P", "S. Patra", "ShubhamPatra", "Shubham_Patra",
    "patrashubham", "patraShubham", "PatraShubham", "patra_shubham", "Patra_Shsubham"
  ];

  const keywords = [
    "Developer", "Full Stack Developer", "Web Developer", "Portfolio", "Dev Portfolio"
  ];

  const locations = ["Cuttack", "Bhubaneswar", "Odisha"];
  const educations = ["SOA", "ITER"];

  // Generate all meaningful combinations
  const alternateNames = [];

  nameVariants.forEach(name => {
    // Name alone
    alternateNames.push(name);

    // Name + Keyword
    keywords.forEach(keyword => {
      alternateNames.push(`${name} ${keyword}`);

      // Name + Keyword + Location
      locations.forEach(location => {
        alternateNames.push(`${name} ${keyword} ${location}`);

        // Name + Keyword + Location + Education
        educations.forEach(edu => {
          alternateNames.push(`${name} ${keyword} ${location} ${edu}`);
        });

        // Name + Keyword + Education
        educations.forEach(edu => {
          alternateNames.push(`${name} ${keyword} ${edu}`);
        });
      });
    });

    // Name + Location
    locations.forEach(location => {
      alternateNames.push(`${name} ${location}`);

      // Name + Location + Education
      educations.forEach(edu => {
        alternateNames.push(`${name} ${location} ${edu}`);
      });
    });

    // Name + Education
    educations.forEach(edu => {
      alternateNames.push(`${name} ${edu}`);
    });
  });

  // Remove duplicates
  const uniqueAlternateNames = [...new Set(alternateNames)];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shubham Patra",
    "alternateName": uniqueAlternateNames,
    "url": "https://www.shubhampatra.dev",
    "sameAs": [
      "https://github.com/ShubhamPatra",
      "https://www.linkedin.com/in/patrashubham/"
    ],
    "jobTitle": "Full Stack Developer Intern",
    "worksFor": {
      "@type": "Organization",
      "name": "Kurators / Artbay Innovation Pvt. Ltd.",
      "sameAs": [
        "https://kurators.com/",
        "https://www.mykurators.com/"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "C/O IBLUE ENTERTAINMENT, 62/1, NEW 7, 1ST CROSS, 2nd Main Rd, Ganganagar",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560032",
        "addressCountry": "IN"
      }
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "SOA University (ITER)",
      "sameAs": "https://www.soa.ac.in/"
    },
    "email": "shubhampatra635@gmail.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "email",
      "email": "shubhampatra635@gmail.com"
    },
    "address": [
      {
        "@type": "PostalAddress",
        "addressLocality": "Cuttack",
        "addressRegion": "Odisha",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "addressCountry": "IN"
      }
    ],
    "knowsAbout": [
      "Full Stack Developer","Web Developer","MERN Developer","Frontend Developer","Backend Developer",
      "Software Developer","Java","C","C++","JavaScript","PHP","React.js","HTML5","CSS3",
      "Node.js","Express.js","MongoDB","MySQL","Data Structures","Algorithms","Problem Solving"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Full Stack Developer Intern",
        "description": "Working on real-world web applications in a fast-paced startup environment using React, Node.js, MongoDB."
      }
    ],
    "worksOn": [
      {
        "@type": "CreativeWork",
        "name": "CodeTogether",
        "description": "A real-time collaborative code editor with live syncing and cursor sharing.",
        "url": "https://codetogetherfrontend.onrender.com/"
      },
      {
        "@type": "CreativeWork",
        "name": "CareerConnect",
        "description": "A comprehensive PHP-based job application portal for job seekers and administrators.",
        "url": "https://careerconnect.wuaze.com/"
      },
      {
        "@type": "CreativeWork",
        "name": "Nyx",
        "description": "A sophisticated full-stack AI chat application featuring Nyx, a cryptic AI oracle.",
        "url": "https://nyxai.onrender.com/"
      }
    ],
    "description": "Final-year B.Tech student at SOA University (ITER), specializing in Computer Science & IT. Full Stack Developer, Web Developer, MERN Developer working on modern web apps and AI assistants like Nyx."
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shubham Patra | Full Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Shubham Patra – Final-year B.Tech student, Full Stack Developer, Web Developer, MERN Developer creating real-time web apps and AI assistants. Experienced in React, Node.js, MongoDB, PHP, and more."
        />
        <meta
          name="keywords"
          content="Shubham Patra, Full Stack Developer, Web Developer, MERN Developer, Frontend Developer, Backend Developer, Software Developer, React, Node.js, MongoDB, PHP, AI Assistant, Nyx, CodeTogether, CareerConnect, Portfolio"
        />
        <meta name="author" content="Shubham Patra" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.shubhampatra.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Shubham Patra | Full Stack Developer Portfolio" />
        <meta
          property="og:description"
          content="Shubham Patra – Final-year B.Tech student, Full Stack Developer, Web Developer, MERN Developer creating real-time web apps and AI assistants."
        />
        <meta property="og:url" content="https://www.shubhampatra.dev" />
        <meta property="og:site_name" content="ShubhamPatra.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shubham Patra | Full Stack Developer Portfolio" />
        <meta
          name="twitter:description"
          content="Shubham Patra – Final-year B.Tech student, Full Stack Developer, Web Developer, MERN Developer creating real-time web apps and AI assistants."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
