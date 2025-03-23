import React from 'react';
import { Box, Typography } from '@mui/material';
import VideoPlayer from '../VideoPlayer';
import DismissibleCard from '../DismissibleCard';

const DashboardHome = () => {
    const firstVideo = {
        title: "Getting Started & Navigating the Platform",
        url: "https://www.youtube.com/watch?v=JllJo_VGCdA",
    };
    
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to Your Dashboard
            </Typography>
            
            <DismissibleCard id="dashboard-video-card">
                <VideoPlayer title={firstVideo.title} url={firstVideo.url} />
            </DismissibleCard>
            
            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    If you're new, we highly recommend the tour.
                </Typography>
            </Box>
            
            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    At the top, you'll see your credit balance. Credits are what make the app run. 
                    Some actions--like Rewrites and Drafts--take more credits than others. 
                    Also, we will refer to Resume as Rez.
                </Typography>
            </Box>
            
            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    The main workflow is the Rewrite. A Rewrite has 3 parts:
                </Typography>
                <Typography variant="body1" color="textSecondary" component="ul" pl={2}>
                    <li>
                        <Typography component="span" textDecoration="underline">
                            Analysis
                        </Typography>{' '}
                        of your current rez compared against a job description (JD).
                    </li>
                    <li>
                        <Typography component="span" textDecoration="underline">
                            Rewrite
                        </Typography>{' '}
                        of your current rez. This Rewrite aligns your rez with the JD Ideal Candidate's
                        resume, making you more likely to get picked for that position.
                    </li>
                    <li>
                        A{' '}
                        <Typography component="span" textDecoration="underline">
                            Cover Letter
                        </Typography>{' '}
                        to go with that application if you feel the need to have one.
                    </li>
                </Typography>
            </Box>
            
            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    That's the basics. If more details would be helpful, you can open the 
                    menu above, find the link for "Learning", and watch a few videos to 
                    learn more about the process.
                </Typography>
            </Box>
            
            <Box mb={2}>
                <Typography variant="h4" gutterBottom>
                    Get Started
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    When you're ready to get going, click on the Menu at the top, and then go to Workspaces on the left.
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    There, you'll find 3 workflows:
                </Typography>
                <Typography variant="body1" color="textSecondary" component="ol" pl={2}>
                    <li>
                        <Typography component="span" textDecoration="underline">
                            Rewriter -
                        </Typography>{' '}
                        Rewrites your rez to match a JD. This is where you'll probably spend most of your time.
                    </li>
                    <li>
                        <Typography component="span" textDecoration="underline">
                            Drafter -
                        </Typography>{' '}
                        Takes 3 JDs and creates a rez for you. Good for building an initial rez to add to your profile or use in the Rewriter.
                    </li>
                    <li>
                        <Typography component="span" textDecoration="underline">
                            Bullet Rewriter -
                        </Typography>{' '}
                        Sometimes, you don't need an entire resume. This tool develops your bullet points under a resume Experience section.
                    </li>
                </Typography>
            </Box>
            
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Coming Soon
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    The following features are in the works (in no particular order):
                </Typography>
                <Typography variant="body1" color="textSecondary" component="ul" pl={2}>
                    <li>
                        ⏳ Google Drive Integration – Pick resumes from GDrive and also save directly to GDrive.
                    </li>
                    
                    <li>
                        <s>⏳ Saving Resumes to your profile.</s>
                    <ul>
                        <li>✅ You can now copy and paste your resume directly into your profile.</li>
                        <li>📎 Upload functionality will be added later.</li>
                    </ul>
                    </li>
                    
                    <li>
                        <s>⏳ Resume Drafting – Maybe you need a resume to begin with.</s>
                    <ul>
                        <li>✅ Add up to 3 JDs to generate a brand-new resume.</li>
                        <li>✅ Uses AI to align content with target roles.</li>
                    </ul>
                    </li>
                    
                    <li>
                        ⏳ Browser Extension – For saving JDs faster.
                    </li>
                    
                    <li>
                        ⏳ Job Hunt Tracking – For tracking status of apps and rezs sent.
                    </li>
                    
                    <li>
                        ⏳ Resume Templates – To make these newly minted resumes look amazing.
                    </li>
                    
                    <li>
                        ⏳ LinkedIn Profile Optimization – To put your best foot forward, no matter where hiring managers are looking.
                    </li>
                </Typography>
            </Box>
        
        </Box>
    );
};

export default DashboardHome;

