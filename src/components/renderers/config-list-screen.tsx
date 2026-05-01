"use client";

import { InboxIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfiguredListScreen } from "@/engine/hooks";
import type {
  ListColumnConfig,
  ListScreenConfig,
} from "@/engine/screen-config";

type ConfigListScreenProps = {
  config: ListScreenConfig;
};

function formatCellValue(value: unknown, column: ListColumnConfig): string {
  if (value === null || value === undefined || value === "") {
    return column.emptyValue;
  }

  if (column.renderAs === "date" && typeof value === "string") {
    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return String(value);
}

export function ConfigListScreen({ config }: ConfigListScreenProps) {
  const listQuery = useConfiguredListScreen(config);

  if (listQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Unable to load {config.title.toLowerCase()}</AlertTitle>
        <AlertDescription>{listQuery.error.message}</AlertDescription>
      </Alert>
    );
  }

  const items = listQuery.data?.items ?? [];

  return (
    <Card className="border-border/70 bg-background/85 shadow-lg shadow-black/5 backdrop-blur">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <Empty className="border border-dashed border-border/80 bg-muted/20">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>{config.emptyTitle}</EmptyTitle>
              <EmptyDescription>{config.emptyDescription}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              {listQuery.isLoading
                ? "Loading records..."
                : "No records returned."}
            </EmptyContent>
          </Empty>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Live records fetched through the centralized action registry.
              </p>
              <Badge variant="secondary">
                {listQuery.data?.total ?? items.length} records
              </Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {config.columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, rowIndex) => (
                  <TableRow key={String(item.id ?? rowIndex)}>
                    {config.columns.map((column) => {
                      const rawValue = item[column.key];
                      const content = formatCellValue(rawValue, column);

                      return (
                        <TableCell key={`${rowIndex}-${column.key}`}>
                          {column.renderAs === "badge" ? (
                            <Badge variant="secondary">{content}</Badge>
                          ) : (
                            content
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
