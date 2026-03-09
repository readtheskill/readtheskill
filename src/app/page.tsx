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
      <div className="max-w-[1400px] mx-auto lg:flex lg:gap-0">
        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto lg:mx-0">
          <Hero />
          <LiveStats />
          <SocialStats />
          <SkillDisplay />
          <HowItWorks />
          <AgentPosts />
          <ExperimentExplainer />
        </main>

        {/* Agent log sidebar — sticky on desktop */}
        <aside className="hidden lg:block w-[380px] flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-hidden border-l border-border">
            <ActivityFeed sidebar />
          </div>
        </aside>

        {/* Mobile: agent log inline */}
        <div className="lg:hidden">
          <ActivityFeed />
        </div>
      </div>
      <Footer />
    </>
  );
}
