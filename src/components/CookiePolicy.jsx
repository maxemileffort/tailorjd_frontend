import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const cookiePolicyData = {
    cookiePolicy: {
      effectiveDate: "2024-12-09",
      lastUpdated: "2024-12-09",
      introduction:
        "At TailorJD, we use cookies and similar tracking technologies to enhance your experience on our platform. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.",
      sections: [
        {
          title: "What Are Cookies?",
          content:
            "Cookies are small text files stored on your device by a website. They help the website remember information about your visit, such as your preferences and activity, to provide a more seamless experience."
        },
        {
          title: "How We Use Cookies",
          content: "We use cookies for the following purposes:",
          items: [
            "Essential Cookies: To enable core functionality, such as user authentication and secure access.",
            "Performance Cookies: To analyze how our platform is used and improve performance.",
            "Functionality Cookies: To remember your preferences and personalize your experience.",
            "Advertising Cookies: To deliver relevant ads based on your activity and interests."
          ]
        },
        {
          title: "Third-Party Cookies",
          content:
            "We may allow third-party service providers to use cookies on our platform for analytics, advertising, or other purposes. These third parties may collect information about your online activities over time and across different websites."
        },
        {
          title: "Managing Your Cookies",
          content:
            "You have the ability to manage or disable cookies through your browser settings. However, please note that disabling cookies may affect the functionality of our platform.",
          items: [
            "Check your browser’s settings to manage cookies.",
            "Opt-out of third-party advertising cookies using industry tools, such as the Network Advertising Initiative (NAI) opt-out page or the Digital Advertising Alliance (DAA) tool."
          ]
        },
        {
          title: "Changes to This Policy",
          content:
            "We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised 'Last Updated' date."
        },
        {
          title: "Contact Us",
          content: "If you have any questions or concerns about this Cookie Policy, please contact us at:",
          items: [
            "Email: legal@tailorjd.com",
            "Address: TBD"
          ]
        }
      ]
    }
  };
  
  const CookiePolicy = () => {
    const { effectiveDate, lastUpdated, introduction, sections } = cookiePolicyData.cookiePolicy;
  
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography id="cookie-policy" variant="h4" gutterBottom>
          Cookie Policy
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
  
  export default CookiePolicy;