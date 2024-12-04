import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4.5rem',
      fontWeight: 900,
      color: '#006C84',
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#006C84',
    },
    body1: {
      fontSize: '1.125rem',
      color: '#4A5568',
      lineHeight: 1.5,
    },
  },
  palette: {
    primary: {
      main: '#2C7D98',
    },
  },
});

const ResourcesPage = () => {
  const navigate = useNavigate();

  const resourceCards = [
    {
      title: "Specifications",
      image: "https://motiongestures.com/assets/Uploads/Resources_OSandPlugins_800x450.png",
      alt: "Code editor screenshot",
      onClick: () => navigate("/specification"),
    },
    {
      title: "Evaluation SDK",
      image: "https://motiongestures.com/assets/Uploads/Resources_SDK_800x450.png",
      alt: "Person working on laptop",
      onClick: () => navigate("/evaluation-sdk"),
    },
    {
      title: "Technology Videos",
      image: "https://motiongestures.com/assets/Uploads/Resources_Cameras_800x450.png",
      alt: "Camera lens",
      onClick: () => window.open("https://www.youtube.com/@MotionGestures/playlists", "_blank"),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="max-w-xl">
            <Typography
              variant="h1"
              component="h1"
              className="mb-6"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                letterSpacing: '-0.01em',
                marginBottom: '1.5rem',
              }}
            >
              Explore the technical resources for our software.
            </Typography>
            <Typography
              variant="body1"
              className="mb-8"
              sx={{ fontSize: '1.25rem', marginBottom: '2rem' }}
            >
              Our SDK can be used on a wide variety of platforms
            </Typography>

          </div>
          <div className="flex justify-center">
            <img
              src="https://motiongestures.com/assets/Uploads/MOG-Hand-Banner-square-Resources.jpg"
              alt="Hand tracking visualization"
              className="w-full max-w-lg object-contain"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {resourceCards.map((card, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                },
              }}
              onClick={card.onClick} // Handle the click action
            >
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.alt}
                sx={{
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ padding: '1.5rem' }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#006C84',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                  }}
                >
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>



      </div>
    </ThemeProvider>
  );
};

export default ResourcesPage;