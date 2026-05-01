import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserStatGridProps = {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    admins: number;
    invitedUsers: number;
  };
};

export function UserStatGrid({ metrics }: UserStatGridProps) {
  const items = [
    { label: "Total users", value: metrics.totalUsers },
    { label: "Active users", value: metrics.activeUsers },
    { label: "Admins", value: metrics.admins },
    { label: "Invited", value: metrics.invitedUsers },
  ] as const;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <Card
          key={item.label}
          className="border-border/70 bg-background/80 backdrop-blur"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
