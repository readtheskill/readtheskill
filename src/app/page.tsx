import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { LiveStats } from "@/components/stats/LiveStats";
import { SocialStats } from "@/components/stats/SocialStats";
import { SkillDisplay } from "@/components/skill-display/SkillDisplay";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { AgentPosts } from "@/components/social/AgentPosts";
import { ExperimentExplainer } from "@/components/hero/ExperimentExplainer";
import { ActivityFeed } from "@/components/activity-feed/ActivityFeed";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto">
        <Hero />
        <LiveStats />
        <SocialStats />
        <SkillDisplay />
        <HowItWorks />
        <AgentPosts />
        <ExperimentExplainer />
        <ActivityFeed />
      </main>
      <Footer />
    </>
  );
}
