//@ts-nocheck
"use client";

import { ComponentProps } from "@/app/types";
import ImageSlider from "@/components/organisms/image-slider";
import ComponentCard from "@/components/templete/lesson-details";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { lessons } from "../../db.json";

const categories = [
  "ALL",
  "Components",
  "Basic",
  "Arduino",
  "Micro:Bit",
  "Circuit Assemblies",
];

export default function LessonPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  // Type `selectedCourse` as an array of ComponentData or null
  const [selectedLesson, setSelectedLesson] = useState<ComponentProps[] | null>(
    null
  );

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen px-2 mx-auto bg-[#EAEBF3]">
      <div className="w-full h-full flex justify-between bg-[#EAEBF3] items-center py-4">
        <ImageSlider />
      </div>
      <main className="w-full mx-auto">
        <div className="flex gap-5 mb-6">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search..."
              className="rounded-full pl-5 h-12 focus-visible:outline-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={toggleViewMode}
            >
              <ToggleGroupItem
                className="rounded-full h-12 w-12 bg-white"
                value={viewMode === "grid" ? "list" : "grid"}
              >
                {viewMode === "grid" ? (
                  <Grid className="h-4 w-4" />
                ) : (
                  <List className="h-4 w-4" />
                )}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-scroll no-scrollbar ">
          {categories.map((category) => (
            <Button
              size="lg"
              className="rounded-full px-5"
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div
          className={`grid gap-3 py-2  ${
            viewMode === "grid"
              ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow  ${
                viewMode === "grid"
                  ? " flex-col items-center"
                  : "flex items-center gap-2 p-2"
              }`}
              onClick={() => setSelectedLesson(lesson.data || null)} // Pass the array or null
            >
              <Image
                width={viewMode === "list" ? 48 : 160}
                height={viewMode === "list" ? 48 : 160}
                src={lesson?.thumbnail}
                alt={lesson?.title}
                className={`object-contain ${
                  viewMode === "grid" ? "m-auto" : ""
                }`}
              />
              <h3
                className={`text-md font-semibold text-center ${
                  viewMode === "grid" ? "py-2" : ""
                }`}
              >
                {lesson.title}
              </h3>
            </div>
          ))}
        </div>

        <Dialog
          open={selectedLesson !== null}
          onOpenChange={() => setSelectedLesson(null)}
        >
          <DialogContent className="h-screen max-w-screen">
            {selectedLesson && (
              <>
                <DialogTitle>
                  <ComponentCard data={selectedLesson} />
                </DialogTitle>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
