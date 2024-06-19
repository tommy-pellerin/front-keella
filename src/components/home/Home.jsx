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
    
    <div className="my-40">
      <MultiCard />
    </div>
    
      <UserFeedback />
    
    <div className="my-8">
      <Faq />
    </div>
  </>
  );
};

export default Home;