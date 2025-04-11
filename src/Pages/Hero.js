// src/Pages/Hero.js
import React, { useRef } from "react";
import { Box } from "@mui/material";
import SectionOneHero from "./HeroSections/SectionOneHero";
import SectionTwoFeatures from "./HeroSections/SectionTwoFeatures";
import SectionThreeLinks from "./HeroSections/SectionThreeLinks";
import SectionFourContact from "./HeroSections/SectionFourContact";

const Hero = ({ darkMode }) => {
  const featuresRef = useRef(null);
  const linksRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh' }}>
      <Box sx={{ scrollSnapAlign: 'start', height: '100vh' }}>
        <SectionOneHero
          onScrollToFeatures={() => scrollTo(featuresRef)}
          onScrollToLinks={() => scrollTo(linksRef)}
          onScrollToContact={() => scrollTo(contactRef)}
        />
      </Box>
      <Box ref={featuresRef} sx={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
        <SectionTwoFeatures />
      </Box>
      <Box ref={linksRef} sx={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
        <SectionThreeLinks />
      </Box>
      <Box ref={contactRef} sx={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
        <SectionFourContact />
      </Box>
    </Box>
  );
};

export default Hero;
