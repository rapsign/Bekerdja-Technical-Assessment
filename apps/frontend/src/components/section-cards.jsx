import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

function SectionCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-16 mt-2" />
            <CardAction>
              <Skeleton className="h-6 w-20 rounded-full" />
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export function SectionCards({ data, loading }) {
  if (loading) return <SectionCardsSkeleton />;

  const statusCounts = data.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {});

  const statusColor = {
    New: "blue",
    Contacted: "yellow",
    Interested: "green",
    Rejected: "red",
  };

  const cards = [
    { title: "Total Candidates", status: "Total" },
    { title: "New Candidates", status: "New" },
    { title: "Interested Candidates", status: "Interested" },
    { title: "Rejected Candidates", status: "Rejected" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card) => {
        const count =
          card.status === "Total"
            ? data.length
            : statusCounts[card.status] || 0;
        const isUp = card.status !== "Rejected";

        return (
          <Card key={card.status}>
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                {count}
              </CardTitle>
              <CardAction>
                <Badge
                  className={`capitalize px-2 py-1 rounded-full font-medium ${
                    statusColor[card.status]
                      ? `bg-${statusColor[card.status]}-100 text-${statusColor[card.status]}-800`
                      : "bg-gray-100 text-gray-800"
                  } flex items-center gap-1`}
                >
                  {isUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {count > 0 ? `+${count}` : 0}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {isUp
                  ? `Positive trend for ${card.status.toLowerCase()}`
                  : `Needs attention for ${card.status.toLowerCase()}`}
                {isUp ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
              <div className="text-muted-foreground">
                Total candidates in this category
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
