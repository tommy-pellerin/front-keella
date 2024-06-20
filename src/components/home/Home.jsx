import React from 'react';
import Hero from './Hero';
import ExplanatoryBanner from './ExplanatoryBanner';
import MultiCard from './HomeCard';
import UserFeedback from './UserFeedback';
import Faq from './Faq';


const Home = () => {
  return (
    <>
    <Hero />
     
      <ExplanatoryBanner />
    
    
      <MultiCard />
    
    
      <UserFeedback />
    
    
      <Faq />
    
  </>
  );
};

export default Home;