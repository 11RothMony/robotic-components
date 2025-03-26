import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { ComponentProps } from "../../app/types";

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
    <div className=" w-[100%] mx-auto border-none shadow-none">
      {/* Card Header with Cover Title */}
      {cover && (
        <div className="py-4 h-[200px]">
          <div className="text-lg mt-8 flex flex-col justify-center items-center font-semibold text-gray-800">
            <div className="w-28 h-28 border bg-gray-100 rounded-md">
              <Image
                width={1000}
                height={1000}
                src={cover.cover || ""}
                // src={cover.cover}
                alt={cover.title || ""}
                className="w-full h-full object-cover"
              />
            </div>
            {cover.title_cover}
          </div>
        </div>
      )}
      <div className="max-w-screen p-2 max-h-[calc(100vh-200px)] overflow-y-auto border-none rounded-md border">
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
                  <span className="text-sm font-bold text-gray-600 capitalize">
                    {section.title}
                  </span>
                  {openSections[index] ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2">
                <p className="text-sm font-normal text-left text-gray-700">
                  {section.text}
                </p>
                {section.img && (
                  <div className="w-full h-full m-auto bg-gray-100 rounded-md overflow-hidden mt-2">
                    <Image
                      width={1000}
                      height={1000}
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
                  <div className="mt-5 flex flex-col gap-4">
                    {section.link.map((item) => {
                      const getYouTubeID = (url: string): string | null => {
                        const regex =
                          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                        const match = url.match(regex);
                        return match ? match[1] : null;
                      };

                      const videoID = getYouTubeID(item?.url);
                      const thumbnailUrl = videoID
                        ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
                        : null;

                      return (
                        <a
                          key={item.titleyoutube}
                          href={item?.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item?.titleyoutube || "title"}
                          className="text-blue-600 items-center hover:underline w-full max-w-full text-sm flex space-x-3"
                        >
                          {thumbnailUrl && (
                            <Image
                              width={1000}
                              height={1000}
                              src={thumbnailUrl}
                              alt={`Thumbnail for Link`}
                              className="w-16 h-12 object-cover rounded"
                            />
                          )}
                          <p className="truncate">
                            {item?.titleyoutube || "title"}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
