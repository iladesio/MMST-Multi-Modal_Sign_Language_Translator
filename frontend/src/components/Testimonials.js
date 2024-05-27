import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import icon from "./icon.png";

const userTestimonials = [
  {
    avatar: icon,
    name: "Daniele Solombrino",
    occupation: "Developer",
    testimonial:
      "Collaborating on this project has been an incredible learning experience.",
  },
  {
    avatar: icon,
    name: "Ilaria De Sio",
    occupation: "UI/UX Designer",
    testimonial:
      "Designing with the user in mind is what I love, and this project put that passion to the test.",
  },
  {
    avatar: icon,
    name: "Giuseppe Bello",
    occupation: "Backend Developer",
    testimonial:
      "Managing this project has been a journey in pushing the boundaries of efficiency and teamwork.",
  },
  {
    avatar: icon,
    name: "Federico Barreca",
    occupation: "UI/UX Designer",
    testimonial:
      "Ensuring the highest quality in our deliverables is my top priority, and this project was no exception.",
  },
  {
    avatar: icon,
    name: "Matteo Mortella",
    occupation: "Developer",
    testimonial:
      "Marketing such an innovative product was both challenging and rewarding.",
  },
];

export default function Testimonials() {
  const theme = useTheme();

  const cardStyle = {
    backgroundColor: theme.palette.mode === "light" ? "#f9f9f9" : "#2c2c2c",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    borderRadius: 2,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
    },
  };

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
        Meet Our Team
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={cardStyle}>
              <CardHeader
                avatar={
                  <Avatar src={testimonial.avatar} alt={testimonial.name} />
                }
                title={testimonial.name}
                subheader={testimonial.occupation}
                titleTypographyProps={{ variant: "h6" }}
                subheaderTypographyProps={{ variant: "body2" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
