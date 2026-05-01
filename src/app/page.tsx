import { ArchitecturePrinciples } from "@/components/composites/architecture-principles";
import { ShellTelemetry } from "@/components/composites/shell-telemetry";
import { TemplateHero } from "@/components/composites/template-hero";
import { ScreenRenderer } from "@/engine/screen-renderer";
import { userManagementScreenConfig } from "@/modules/users/config";
import { UserDirectoryOverview } from "@/modules/users/components/user-directory-overview";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(240,200,150,0.26),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(126,168,198,0.18),_transparent_34%),linear-gradient(180deg,_rgba(248,244,238,1),_rgba(255,255,255,1))]" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10 md:px-10">
        <TemplateHero />
        <ShellTelemetry />
        <UserDirectoryOverview />
        <ArchitecturePrinciples />
        <section className="space-y-4">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {userManagementScreenConfig.title}
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {userManagementScreenConfig.description}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {userManagementScreenConfig.screens.map((screenConfig) => (
              <ScreenRenderer key={screenConfig.id} config={screenConfig} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
