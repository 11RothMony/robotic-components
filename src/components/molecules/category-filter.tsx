"use client";

import { Category } from "@/app/types";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ["ALL", "WEB", "MOBILE", "ROBOTIC"];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-8">
      {categories.map((category) => (
        <Button
          className="border-gray-200"
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
