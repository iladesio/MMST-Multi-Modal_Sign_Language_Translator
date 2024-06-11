import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { Trans, useTranslation } from "react-i18next";
import FemaleIcon from "./FemaleIcon.png";
import MaleIcon1 from "./male_icon.png";
import MaleIcon2 from "./male_icon2.png";
import MaleIcon3 from "./male_icon3.png";
import MaleIcon4 from "./male_icon4.png";

const userTestimonials = [
  {
    avatar: MaleIcon1,
    name: "Daniele Solombrino",
    occupation: "occupation_msc_student",
    testimonial: "testimonial_daniele",
  },
  {
    avatar: FemaleIcon,
    name: "Ilaria De Sio",
    occupation: "occupation_msc_student",
    testimonial: "testimonial_ilaria",
  },
  {
    avatar: MaleIcon2,
    name: "Giuseppe Bello",
    occupation: "occupation_msc_student",
    testimonial: "testimonial_giuseppe",
  },
  {
    avatar: MaleIcon3,
    name: "Federico Barreca",
    occupation: "occupation_msc_student",
    testimonial: "testimonial_federico",
  },
  {
    avatar: MaleIcon4,
    name: "Matteo Mortella",
    occupation: "occupation_msc_student",
    testimonial: "testimonial_matteo",
  },
];

export default function Testimonials() {
  const theme = useTheme();
  const { t } = useTranslation();

  const cardStyle = {
    backgroundColor: theme.palette.mode === "light" ? "#f9f9f9" : "#2c2c2c",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    borderRadius: 2,
    transition: "0.3s",
    minHeight: "150px", // Imposta un'altezza minima per garantire dimensioni uniformi
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 2,
          mt: 4,
          mb: 4,
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "50px",
            height: "4px",
            backgroundColor: "primary.main",
            margin: "8px auto 0",
          },
        }}
      >
        <Trans i18nKey="meet_our_team" />
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={6} sm={2} md={4} key={index}>
            <Card sx={cardStyle}>
              <CardHeader
                avatar={
                  <Avatar src={testimonial.avatar} alt={t(testimonial.name)} />
                }
                title={<Trans i18nKey={testimonial.name} />}
                subheader={<Trans i18nKey={testimonial.occupation} />}
                titleTypographyProps={{ variant: "h6" }}
                subheaderTypographyProps={{ variant: "body2" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Trans i18nKey={testimonial.testimonial} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
