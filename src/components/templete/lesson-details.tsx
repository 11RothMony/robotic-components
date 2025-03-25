import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { ComponentProps } from "../../app/types";
// import  ComponentData  from "../../app/types";

const ComponentCard: React.FC<ComponentProps> = ({ data }: ComponentProps) => {
  const [openSections, setOpenSections] = React.useState<{
    [key: number]: boolean;
  }>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const cover = data.find((item) => item.title_cover);
  const otherSections = data.filter(
    (item) => !item.title_cover && item?.title.toLowerCase()
  );

  return (
    <Card className=" w-[100%] mx-auto border-none shadow-none">
      {/* Card Header with Cover Title */}
      {cover && (
        <div className="py-4">
          <div className="text-lg flex flex-col justify-center items-center font-semibold text-gray-800">
            <div className="w-28 h-28 border bg-gray-100 rounded-md overflow-hidden">
              <img
                src={cover.cover}
                alt={cover.title}
                className="w-full h-full object-cover"
              />
            </div>
            {cover.title_cover}
          </div>
        </div>
      )}
      <div className=" w-full pr-4 border-none overflow-y-auto h-[420px] rounded-md border">
        {/* Collapsible Sections */}
        <div className="space-y-2">
          {otherSections.map((section, index) => (
            <Collapsible
              key={index}
              open={openSections[index] || false}
              onOpenChange={() => toggleSection(index)}
              className="border rounded-md px-2 bg-gray-50"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex justify-between w-full text-left "
                >
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {section.title}
                  </span>
                  {openSections[index] ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-5">
                <p className="text-sm text-left text-gray-700">
                  {section.text}
                </p>
                {section.img && (
                  <div className="w-full h-full m-auto bg-gray-100 rounded-md overflow-hidden mt-2">
                    <img
                      src={section.img}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {section.video && (
                  <div className="w-full h-full m-auto bg-gray-100 rounded-md mt-2">
                    <video
                      src={section.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {section.link && section.link.length > 0 && (
                  <div className="mt-2">
                    {section.link.map((url, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline block text-sm"
                      >
                        Link {linkIndex + 1}
                      </a>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ComponentCard;
