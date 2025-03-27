
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VotingForm from "@/components/VotingForm";
import { motion } from "framer-motion";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { Calendar, AlertCircle, Info, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const VotePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isVotingActive, remainingDays, votingPeriod } = useVotingPeriod();
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToVotingForm = () => {
    const votingForm = document.getElementById('voting-form');
    if (votingForm) {
      votingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4f3] dark:bg-black">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-16 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="heading-xl bg-clip-text text-transparent bg-gradient-to-r from-[#5b2333] to-[#5b2333]/80 dark:from-white dark:to-white/80"
            >
              Cast Your Opinion
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="body-lg text-black dark:text-white max-w-2xl mx-auto mt-4"
            >
              Help shape the future of entertainment by sharing your content preferences across films, TV shows, YouTube videos, and streaming platforms.
              Your opinion helps creators understand audience interests better.
            </motion.p>
            
            <div className="flex justify-center mt-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={scrollToVotingForm}
                className="px-6 py-3 bg-[#5b2333] text-white rounded-lg flex items-center gap-2 hover:bg-[#5b2333]/90 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90 animate-pulse"
              >
                Cast Your Opinion Now
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-3xl mx-auto mb-10 p-5 rounded-xl bg-white/60 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-[#5b2333] dark:text-white mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg mb-1 text-[#5b2333] dark:text-white">Voting Rules</h3>
                <p className="text-black dark:text-white/80 text-sm mb-3">
                  To ensure accurate data collection, each user can only vote once per category 
                  (Films, YouTube Films, YouTube Content, OTT, Television) during a voting period. This helps us maintain data 
                  quality and ensures that content creators receive balanced feedback.
                </p>
                
                <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 mt-2">
                  <ul className="text-sm space-y-2 text-black dark:text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">1</span>
                      <span>You can share your opinion once in <span className="font-medium text-black dark:text-white">Films</span>, once in <span className="font-medium text-black dark:text-white">YouTube Films</span>, once in <span className="font-medium text-black dark:text-white">YouTube Content</span>, once in <span className="font-medium text-black dark:text-white">OTT</span>, and once in <span className="font-medium text-black dark:text-white">Television</span> categories per voting period.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">2</span>
                      <span>After sharing your opinion in a category, you'll need to wait until the next voting period to vote in that category again.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">3</span>
                      <span>Your opinion matters and helps creators make better content decisions based on authentic audience preferences.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-[#5b2333] dark:text-white" />
                  <span>
                    {isVotingActive ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Current voting period is active with {remainingDays} days remaining.
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        Voting is currently closed. Check back soon for the next voting period.
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div id="voting-form">
            <VotingForm />
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default VotePage;
