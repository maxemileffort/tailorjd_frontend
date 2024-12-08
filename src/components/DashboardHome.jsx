// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';

// const DashboardHome = () => {
//     // const handleTourStart = () => {
//     //     console.log('Tour started!');
//     // };

//     return (
//         <Box>
//             <Typography variant="h4" gutterBottom>
//                 Welcome to Your Dashboard
//             </Typography>

//             <Box mb={2}>
//                 <Typography variant="body1" color="textSecondary">
//                     At the top, you'll see your credit balance. One credit = one{' '}
//                     <Typography component="span" fontWeight="bold">
//                         Rewrite
//                     </Typography>. Also, we will refer to Resume as Rez.
//                 </Typography>
//             </Box>

//             <Box mb={2}>
//                 <Typography variant="body1" color="textSecondary">
//                     A Rewrite has 3 parts:
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary" component="ul" pl={2}>
//                     <li>
//                         <Typography component="span" textDecoration="underline">
//                             Analysis
//                         </Typography>{' '}
//                         of your current rez compared against a job description (JD).
//                     </li>
//                     <li>
//                         <Typography component="span" textDecoration="underline">
//                             Rewrite
//                         </Typography>{' '}
//                         of your current rez. This Rewrite aligns your rez with the JD Ideal Candidate's
//                         resume, making you more likely to get picked for that position.
//                     </li>
//                     <li>
//                         A{' '}
//                         <Typography component="span" textDecoration="underline">
//                             Cover Letter
//                         </Typography>{' '}
//                         to go with that application if you feel the need to have one.
//                     </li>
//                 </Typography>
//             </Box>

//             <Box mb={2}>
//                 <Typography variant="body1" color="textSecondary">
//                     That's the basics. If more details would be helpful, you can use the menu to the
//                     left. Find the link for "Learning" and watch a few videos to learn more about the
//                     process.
//                 </Typography>
//             </Box>

//             <Box mb={2}>
//                 <Typography variant="body1" color="textSecondary">
//                     If you are interested, to learn your way around, there's also a tour.
//                 </Typography>
//             </Box>

            

//             <Box mt={4}>
//                 <Typography variant="h4" gutterBottom>
//                     Coming Soon
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary">
//                     The following features are in the works (in no particular order):
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary" component="ul" pl={2}>
//                     <li>Google Drive Integration - Pick resumes from GDrive and also save directly to Gdrive.</li>
//                     <li>Saving Resumes to your profile.</li>
//                     <li>Resume Drafting - Done! Check it out in Workspaces.</li>
//                     <li>Browser Extension - For saving JDs faster.</li>
//                     <li>Job Hunt Tracking - For tracking status of apps and rezs sent.</li>
//                 </Typography>
//             </Box>
//         </Box>
//     );
// };

// export default DashboardHome;

import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardHome = () => {
  

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome to Your Dashboard
            </Typography>

            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    At the top, you'll see your credit balance. One credit = one{' '}
                    <Typography component="span" fontWeight="bold">
                        Rewrite
                    </Typography>. Also, we will refer to Resume as Rez.
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    A Rewrite has 3 parts:
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
                    That's the basics. If more details would be helpful, you can use the menu to the
                    left. Find the link for "Learning" and watch a few videos to learn more about the
                    process.
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant="body1" color="textSecondary">
                    If you are interested, to learn your way around, there's also a tour.
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
                    <li>Google Drive Integration - Pick resumes from GDrive and also save directly to Gdrive.</li>
                    <li>Saving Resumes to your profile.</li>
                    <li>Resume Drafting - Done! Check it out in Workspaces.</li>
                    <li>Browser Extension - For saving JDs faster.</li>
                    <li>Job Hunt Tracking - For tracking status of apps and rezs sent.</li>
                </Typography>
            </Box>
        </Box>
    );
};

export default DashboardHome;

