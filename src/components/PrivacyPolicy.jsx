import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const privacyPolicyData = {
  privacyPolicy: {
    effectiveDate: "[Insert Date]",
    lastUpdated: "[Insert Date]",
    introduction:
      "At TailorJD, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.",
    sections: [
      {
        title: "Information We Collect",
        content: "We collect the following types of information:",
        items: [
          "Personal Information: Name, email address, and payment information.",
          "Usage Data: Details about how you use our platform, such as pages visited and features used.",
          "Device Information: Information about the device and browser you use to access our services."
        ]
      },
      {
        title: "How We Use Your Information",
        content: "We use your information for the following purposes:",
        items: [
          "To provide and improve our services.",
          "To process transactions and send confirmations.",
          "To communicate updates, offers, and other relevant information.",
          "To ensure security and prevent unauthorized access."
        ]
      },
      {
        title: "Sharing Your Information",
        content:
          "We do not sell your personal information. However, we may share your data with third parties in the following cases:",
        items: [
          "With service providers to process payments, provide analytics, or enhance our services.",
          "To comply with legal obligations or respond to lawful requests.",
          "To protect our rights, privacy, safety, or property."
        ]
      },
      {
        title: "Data Security",
        content:
          "We implement industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
      },
      {
        title: "Your Choices",
        content: "You have the following rights regarding your personal information:",
        items: [
          "Access: Request access to your data.",
          "Correction: Request corrections to inaccurate or incomplete information.",
          "Deletion: Request the deletion of your personal data.",
          "Opt-Out: Opt out of receiving promotional communications."
        ]
      },
      {
        title: "Cookies and Tracking Technologies",
        content:
          "We use cookies and similar technologies to improve your experience on our platform. You can manage your cookie preferences through your browser settings."
      },
      {
        title: "Changes to This Policy",
        content:
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised 'Last Updated' date. Continued use of TailorJD constitutes acceptance of the updated policy."
      },
      {
        title: "Contact Us",
        content: "If you have any questions or concerns about this Privacy Policy, please contact us at:",
        items: [
          "Email: [Insert Email Address]",
          "Address: [Insert Address]"
        ]
      }
    ]
  }
};


const PrivacyPolicy = () => {
  const { effectiveDate, lastUpdated, introduction, sections } = privacyPolicyData.privacyPolicy;

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography id="privacy" variant="h4" gutterBottom>
        Privacy Policy
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

export default PrivacyPolicy;
