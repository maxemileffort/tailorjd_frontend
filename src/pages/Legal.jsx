import React from "react";
import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import CookiePolicy from "../components/CookiePolicy";
import CallToAction from "../components/CTAFreeCredits";

const LegalPage = () => {
  return (
    <Container>
    <Navbar />
    <Container
    maxWidth="lg"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
    
    <Typography variant="h1" sx={{fontSize: "2rem", mt : 2, mb : 2}} >Legal</Typography>
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="terms-content"
    id="terms-header"
    >
    <Typography variant="h6">Terms of Service</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <TermsOfService />
    </AccordionDetails>
    </Accordion>
    
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="terms-content"
    id="terms-header"
    >
    <Typography variant="h6">Privacy</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <PrivacyPolicy />
    </AccordionDetails>
    </Accordion>
    
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="terms-content"
    id="terms-header"
    >
    <Typography variant="h6">Cookie Policy</Typography>
    </AccordionSummary>
    <AccordionDetails>
    <CookiePolicy />
    </AccordionDetails>
    </Accordion>
    
    <CallToAction />
    
    </Container>
    </Container>
    
  );
};

export default LegalPage;
