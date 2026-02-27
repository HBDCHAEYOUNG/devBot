import {
  LandingIntroSection,
  LandingFeaturesSection,
  LandingTemplateTypesSection,
} from "@/widgets/landing";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <LandingIntroSection />
      <LandingFeaturesSection />
      <LandingTemplateTypesSection />
    </div>
  );
}
