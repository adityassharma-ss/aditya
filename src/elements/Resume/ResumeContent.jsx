import React from "react";

const ResumeContent = () => {

const resumeText = `
Aditya Sharma

I'm a technophile who specializes in Full-Stack Development and DevOps.

Email: adityashf7@gmail.com | (+91) 6203502551 | Bangalore, Karnataka, India

LinkedIn | GitHub | LeetCode

Education:

Manipal University Jaipur (MUJ) Jaipur, Rajasthan, India
Bachelor of Technology in Electronics & Communication Engineering (ECE)           July 2020 - June 2024
CGPA: 8.79/10

St. Karen’s High School Patna, Bihar, India
Intermediate (12th) Science with Economics                                                            May 2018 - April 2020
Percentage: 87%

Experience:

Webcube Infotech | Frontend Developer Intern Remote | May 2022 - Jul 2022
Developed the frontend of a commercial website using React-JS. Acquired experience with JavaScript, Git, SaaS, and Material UI.

Skills:

Programming Languages: Java, C++, Python, SQL, HTML/CSS
Libraries/Frameworks: ExpressJs, DevOps, React, NodeJS
Tools / Platforms: Docker, Kubernetes, Git/Github, AWS, Linux
Databases: MySQL, MongoDB, OracleDB, MS Excel

Projects:

E-Commerce WebApp | Link Java, Spring, JavaScript, MySql 
Created an e-commerce shopping WebApp with Java-Spring Boot as Backend with Database connected to MySQL
Server.

MUJ Bubble | Link Expressjs, ReactJs, MongoDB
Developed a college-based Blogging webapp where students from all streams can post about their achievements & share their experience.

Multi-Container Apps with Docker | Link Docker, Kubernetes, Java, HTML
Developed a webapp running on multi-container using docker in which the yaml le allows you to configure and document all your application's service dependencies.

Fake News Detection Model | Link Python, Deep Learning
Used Python libraries, Machine learning models like Multinomial Naive-Bayes, Deep Learning concepts, and Data cleaning concepts to train a model which detects Fake-News.

Open-Source:

Score-spec | Link : Score is an open source, platform-agnostic, container-based workload specification. I am currently working to unify CLI tools and defining JSON schema.

Certifications:

Python Programming - GOOGLE
CCNA Practitioner - CISCO Academy
Java-MongoDB - MongoDB University
Cloud Computing - LinkedIn Learning.

Honors & Awards:

MUJ ACM Hackathon - Top 8 Teams - July 2021
IEEE All India Hackathon - Top 10 Teams - February 2022
Student Committee Member - Department of Engineering - MUJ
Review Paper on Cloud Computing technologies (To be published) 
2 X TMA Engineering Scholarship Winner



`;
  
  return (
    <textarea value={resumeText} style={{ width: '100%', height: '100%', fontFamily: 'Arial, sans-serif',
	fontSize: '14px', }} />
  );
};

export default ResumeContent;