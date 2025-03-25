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
import { useState } from "react";

const categories = [
  "ALL",
  "Components",
  "Basic",
  "Arduino",
  "Micro:Bit",
  "Circuit Assemblies",
];

import Image from "next/image";
import { lessons } from "../../db.json";

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
      <div className="w-full h-auto  flex justify-between bg-[#EAEBF3] items-center py-5">
        <div className=" w-full h-full">
          <ImageSlider />
        </div>
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
              className="rounded-full pl-5 focus-visible:outline-blue-500"
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
                className="rounded-full bg-white"
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
              size="sm"
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
              className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setSelectedLesson(lesson.data || null)} // Pass the array or null
            >
              <div className="p-2 m-auto items-center h-32 w-32">
                <Image
                  width={480}
                  height={200}
                  src={lesson?.thumbnail}
                  alt={lesson?.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center p-2">
                <h3 className="text-md font-semibold">{lesson.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={selectedLesson !== null}
          onOpenChange={() => setSelectedLesson(null)}
        >
          <DialogContent className="h-screen w-[100%]">
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
