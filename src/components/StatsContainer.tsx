
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import StatsSection from "./StatsSection";
import NotesSection from "./NotesSection";
import YouTubeContentStats from "./YouTubeContentStats";
import TelevisionStats from "./TelevisionStats";
import { motion, AnimatePresence } from "framer-motion";

interface StatsContainerProps {
  activeSection: string;
}

const StatsContainer = ({ activeSection }: StatsContainerProps) => {
  const [currentTab, setCurrentTab] = useState<string>("stats");
  const [contentType, setContentType] = useState<string>("film");
  
  useEffect(() => {
    // Reset to stats tab when section changes
    setCurrentTab("stats");
    
    // Set appropriate content type based on active section
    if (activeSection === "youtube") {
      setContentType("youtubeFilm");
    } else {
      setContentType("film");
    }
  }, [activeSection]);
  
  // Map section to project types
  const getProjectTypes = () => {
    switch (activeSection) {
      case "films":
        return ["HighBudgetFilm", "LowBudgetFilm", "ShortFilm"];
      case "youtube":
        return contentType === "youtubeFilm" ? ["YouTubeFilm"] : ["YouTubeContent"];
      case "ott":
        return ["OTTPlatform"];
      case "television":
        return ["Television"];
      default:
        return ["HighBudgetFilm"];
    }
  };
  
  const getSectionTitle = () => {
    switch (activeSection) {
      case "films":
        return "Film Preferences";
      case "youtube":
        return contentType === "youtubeFilm" ? "YouTube Film Preferences" : "YouTube Content Preferences";
      case "ott":
        return "OTT Platform Preferences";
      case "television":
        return "Television Content Preferences";
      default:
        return "Content Preferences";
    }
  };
  
  const getDescription = () => {
    switch (activeSection) {
      case "films":
        return "Discover audiences' favorite genres across different budget ranges of films";
      case "youtube":
        return contentType === "youtubeFilm" 
          ? "See what types of YouTube films audiences are most interested in watching"
          : "Explore what types of YouTube content (beyond films) viewers prefer";
      case "ott":
        return "Explore what viewers prefer to watch on various OTT platforms";
      case "television":
        return "Discover what television channels and content types viewers prefer";
      default:
        return "Explore audience preferences";
    }
  };
  
  const renderYouTubeToggle = () => {
    if (activeSection !== "youtube") return null;
    
    return (
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg border bg-card p-1">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              contentType === "youtubeFilm" 
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setContentType("youtubeFilm")}
          >
            YouTube Films
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              contentType === "youtubeContent" 
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setContentType("youtubeContent")}
          >
            YouTube Content
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="heading-md mb-2">{getSectionTitle()}</h2>
        <p className="text-muted-foreground">{getDescription()}</p>
      </div>
      
      {renderYouTubeToggle()}
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="stats">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M8 18V9" />
                <path d="M12 18v-5" />
                <path d="M16 18v-2" />
              </svg>
              Statistics
            </span>
          </TabsTrigger>
          <TabsTrigger value="notes">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 6.1H3" />
                <path d="M21 12.1H3" />
                <path d="M15.1 18H3" />
              </svg>
              Audience Notes
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="mt-6">
          {activeSection === "youtube" && contentType === "youtubeContent" ? (
            <YouTubeContentStats />
          ) : activeSection === "television" ? (
            <TelevisionStats />
          ) : (
            <StatsSection projectTypes={getProjectTypes()} />
          )}
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <NotesSection projectTypes={getProjectTypes()} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StatsContainer;
