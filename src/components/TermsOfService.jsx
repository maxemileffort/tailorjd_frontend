import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const termsData = {
    termsOfService: {
        "effectiveDate": "2024-12-09",
      "lastUpdated": "2024-12-09",
      "introduction": "Welcome to TailorJD! These Terms of Service (\"Terms\") govern your use of our website, services, and products provided by TailorJD (\"we,\" \"us,\" or \"our\"). By accessing or using TailorJD, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.",
      "sections": [
        {
          "title": "Services Provided",
          "content": "TailorJD offers AI-driven tools to help users customize resumes and cover letters based on job descriptions. By using our platform, you can:",
          "items": [
            "Effortlessly tailor your job applications.",
            "Receive AI-driven insights to optimize your applications.",
            "Streamline your job-hunting process."
          ]
        },
        {
          "title": "Eligibility",
          "content": "To use our services, you must:",
          "items": [
            "Be at least 18 years old.",
            "Provide accurate and truthful information during registration.",
            "Comply with all applicable laws and regulations."
          ]
        },
        {
          "title": "User Accounts",
          "items": [
            "You may be required to create an account to access certain features.",
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "You agree to notify us immediately of any unauthorized use of your account."
          ]
        },
        {
          "title": "Acceptable Use",
          "content": "When using TailorJD, you agree not to:",
          "items": [
            "Use the service for any unlawful purpose.",
            "Interfere with or disrupt the operation of the platform.",
            "Attempt to reverse-engineer or misuse our AI tools."
          ]
        },
        {
          "title": "Payment and Subscriptions",
          "items": [
            "Certain features may require payment or subscription.",
            "All payments are processed securely through third-party providers (e.g., Stripe).",
            "Subscription plans may automatically renew unless canceled.",
            "Refunds are subject to our [Refund Policy](#)."
          ]
        },
        {
          "title": "Intellectual Property",
          "items": [
            "All content, features, and tools on TailorJD are owned or licensed by us.",
            "You may not copy, modify, distribute, or exploit any part of our services without permission."
          ]
        },
        {
          "title": "Disclaimer of Warranties",
          "content": "TailorJD provides its services \"as is\" and makes no guarantees regarding:",
          "items": [
            "The accuracy, completeness, or effectiveness of AI-driven insights.",
            "The likelihood of securing employment."
          ]
        },
        {
          "title": "Limitation of Liability",
          "content": "To the fullest extent permitted by law, TailorJD will not be liable for:",
          "items": [
            "Any indirect, incidental, or consequential damages arising from the use of our services.",
            "Errors, omissions, or inaccuracies in the content provided."
          ]
        },
        {
          "title": "Privacy Policy",
          "content": "Your use of TailorJD is also governed by our Privacy Policy (on this page), which explains how we collect, use, and protect your data."
        },
        {
          "title": "Termination",
          "content": "We reserve the right to suspend or terminate your account if you violate these Terms or engage in any prohibited activity."
        },
        {
          "title": "Governing Law",
          "content": "These Terms are governed by the laws of Tulsa, OK, USA. Any disputes will be resolved exclusively in the courts of Tulsa, OK, USA."
        },
        {
          "title": "Changes to Terms",
          "content": "We may update these Terms from time to time. Any changes will be posted on this page with a revised \"Last Updated\" date. Continued use of TailorJD constitutes acceptance of the updated Terms."
        },
        {
          "title": "Contact Us",
          "content": "For any questions or concerns about these Terms, please contact us at:",
          "items": [
            "Email: legal@tailorjd.com",
            "Address: TBD"
          ]
        }
      ]
        
    }
      
    }
  ;

const TermsOfService = () => {
  const { effectiveDate, lastUpdated, introduction, sections } = termsData.termsOfService;

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography id="terms" variant="h4" gutterBottom>
        Terms of Service
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Effective Date:</strong> {effectiveDate}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Last Updated:</strong> {lastUpdated}
      </Typography>
      <Typography variant="body1" paragraph>
        {introduction}
      </Typography>

      {sections.map((section, index) => (
        <Box sx={{ marginTop: 4 }} key={index}>
          <Typography variant="h5" gutterBottom>
            {index + 1}. {section.title}
          </Typography>
          {section.content && (
            <Typography variant="body1" paragraph>
              {section.content}
            </Typography>
          )}
          {section.items && (
            <List>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      ))}
    </Container>
  );
};

export default TermsOfService;
