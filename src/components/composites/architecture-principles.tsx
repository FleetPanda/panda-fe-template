import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { templateCapabilities, templatePrinciples } from "@/config/template";

export function ArchitecturePrinciples() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid gap-4 md:grid-cols-3">
        {templatePrinciples.map((principle) => (
          <Card
            key={principle.title}
            className="border-border/70 bg-background/75 backdrop-blur"
          >
            <CardHeader>
              <CardTitle className="text-base">{principle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {principle.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/70 bg-background/75 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Included from day one</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {templateCapabilities.map((capability) => (
            <p
              key={capability}
              className="rounded-lg border border-border/70 bg-muted/25 px-3 py-2 text-sm text-muted-foreground"
            >
              {capability}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
