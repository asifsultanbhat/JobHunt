import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333333',
  },
  header: {
    marginBottom: 40,
    borderBottom: '1pt solid #dddddd',
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
  },
  date: {
    marginBottom: 20,
  },
  companyDetails: {
    marginBottom: 30,
  },
  jobTitle: {
    fontFamily: 'Helvetica-Bold',
  },
  bodyHeading: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  body: {
    textAlign: 'justify',
  },
  paragraph: {
    marginBottom: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    color: '#999999',
    fontSize: 10,
    borderTop: '1pt solid #eeeeee',
    paddingTop: 10,
  }
});

interface JobApplicationPdfProps {
  jobTitle: string;
  companyName: string;
  coverLetterText: string;
}

export const JobApplicationPdf = ({ jobTitle, companyName, coverLetterText }: JobApplicationPdfProps) => {
  const paragraphs = coverLetterText.split('\n\n').filter(p => p.trim() !== '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>Applicant Name</Text>
          <Text style={styles.contact}>applicant@example.com | (555) 123-4567 | your-portfolio.com</Text>
        </View>

        <View style={styles.date}>
          <Text>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>

        <View style={styles.companyDetails}>
          <Text>Hiring Manager</Text>
          <Text style={styles.jobTitle}>{companyName}</Text>
          <Text>Re: Application for {jobTitle}</Text>
        </View>

        <View style={styles.body}>
          {paragraphs.map((p, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {p.trim()}
            </Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Generated via Job Hunt App (Powered by Gemini)</Text>
        </View>
      </Page>
    </Document>
  );
};
