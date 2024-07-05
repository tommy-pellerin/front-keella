import React, { useEffect } from 'react';
import Hero from './Hero';
import ExplanatoryBanner from './ExplanatoryBanner';
import MultiCard from './HomeCard';
import UserFeedback from './UserFeedback';
import Faq from './Faq';
import { Helmet } from "react-helmet";

const Home = () => {

  return (
    <>
    <Helmet>
      <title>Keella | Accueil</title>
      <meta name="description" content="page d'accueil" />
    </Helmet>
    <Hero />
    <ExplanatoryBanner />
    <MultiCard />
    <UserFeedback />
    <Faq />
    
    </>
  );
};

export default Home;