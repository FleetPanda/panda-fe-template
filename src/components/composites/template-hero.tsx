import { SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function TemplateHero() {
  return (
    <Card className="overflow-hidden border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(246,216,181,0.55),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(246,241,235,0.82))] shadow-2xl shadow-amber-950/10">
      <CardContent className="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-4">
          <Badge variant="secondary" className="w-fit">
            <SparklesIcon data-icon="inline-start" />
            AI-ready frontend foundation
          </Badge>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {siteConfig.primaryNavigation.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
          <Button variant="outline">Config-first by default</Button>
        </div>
      </CardContent>
    </Card>
  );
}
