"use client";

import { Lesson } from "@/app/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-lg border-gray-200 transition-shadow">
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
        <CardDescription>{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => router.push(`/lesson/${lesson.id}`)}
          className="w-full cursor-pointer"
        >
          View Class
        </Button>
      </CardContent>
    </Card>
  );
}
