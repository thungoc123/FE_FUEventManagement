import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@relume_io/relume-ui";
  import type { ButtonProps } from "@relume_io/relume-ui";
  import { BiPencil,BiBookmark,BiDotsHorizontalRounded, BiMap, BiSearch } from "react-icons/bi";
  
  type ImageProps = {
    src: string;
    alt?: string;
  };
  
  type PropertyCard = {
    image: ImageProps;
    title: string;
    description: string;
    date: string;
    state: string;
    event : string;
    button: ButtonProps;
  };
  
  type Props = {
    heading: string;
    description: string;
    inputIcon: React.ReactNode;
    selectPlaceholder: string;
    selectItems: string[];
    options: string[];
    properties: PropertyCard[];
  };
  
  export type GridList6Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;
  
  export const GridList6 = (props: GridList6Props) => {
    const { heading, description, inputIcon, selectPlaceholder, selectItems, properties,options } = {
      ...GridList6Defaults,
      ...props,
    } as Props;
    return (
      <section>
        <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
          <div className="w-full max-w-lg">
            <h1 className="text-xl font-bold md:text-2xl">{heading}</h1>
            <p className="mt-2">{description}</p>
          </div>
          <div className="flex items-center justify-between md:justify-normal">
            <Input placeholder="Search" icon={inputIcon} className="mr-4" />
            <Select>
              <SelectTrigger className="w-[110px] px-4 py-2">
                <SelectValue placeholder={selectPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {selectItems.map((item, index) => (
                  <SelectItem key={index} value={`${item.toLowerCase().replace(/\s/g, "-")}`}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid w-full auto-cols-fr grid-cols-1 gap-6 lg:grid-cols-2">
          {properties.map((property, index) => (
            <div
              key={index}
              className="grid auto-cols-fr grid-cols-1 items-center border border-border-primary md:grid-cols-[0.5fr_1fr]"
            >
              <div className="size-full overflow-hidden">
                <img
                  src={property.image.src}
                  alt={property.image.alt}
                  className="aspect-square size-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h2 className="text-md font-bold leading-[1.4] md:text-xl">{property.title}</h2>
                  <div className="p-2">
                  {/* <Select>
              <SelectTrigger >
                
                      <BiPencil className="size-6" />
              </SelectTrigger>
              <SelectContent>
                {selectItems.map((item, index) => (
                  <SelectItem key={index} value={`${item.toLowerCase().replace(/\s/g, "-")}`}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            <DropdownMenu>
            <DropdownMenuTrigger>
              <BiDotsHorizontalRounded className="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, index) => (
                <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
                  </div>
                </div>
                <p className="mb-3 md:mb-4">{property.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <BiMap className="size-6" />
                    <span className="text-sm">{property.date}</span>
                  </div>
                 
                 
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 md:mt-6">
                  <div>
                    <span className="text-xl font-bold md:text-2xl">{property.state}</span>
                    <span className={`before:content-['_']`}>{property.event}</span>
                  </div>
                  <Button {...property.button}>{property.button.title}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export const GridList6Defaults: GridList6Props = {
    heading: "Popular Properties",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
    selectPlaceholder: "Sort by",
    inputIcon: <BiSearch className="size-6" />,
    options: ["Option One", "Option Two", "Option Three"],
    selectItems: ["Option 1", "Option 2", "Option 3"],
    properties: [
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          alt: "Property Image 1",
        },
        title: "Program 1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        date: "Jun 23, 2024",
        state: "Unpublish",
        event : "Event 1",
        button: {
          title: "View",
          size: "sm",
        },
      },
      {
        image: {
          src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          alt: "Property Image 1",
        },
        title: "Program 1",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        date: "Jun 23, 2024",
        state: "Unpublish",
        event : "Event 1",
        button: {
          title: "View",
          size: "sm",
        },
      },
    ],
  };
  
  GridList6.displayName = "GridList6";
  