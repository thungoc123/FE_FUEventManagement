import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type QuestionsProps = {
  title: string;
  answer: string;
};

type Props = {
  heading: string;
  description: string;
  footerHeading: string;
  footerDescription: string;
  button: ButtonProps;
  questions: QuestionsProps[];
};

export type Faq7Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Faq7 = (props: Faq7Props) => {
  const {questions, footerHeading, footerDescription, button } = {
    ...Faq7Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[20%] py-16 md:py-44 lg:py-28">
    
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:gap-y-12">
          {questions.map((question, index) => (
            <div key={index}>
              <h1 className="mb-3 text-base font-bold md:mb-4 md:text-md">{question.title}</h1>
              <p>{question.answer}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h1 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {footerHeading}
          </h1>
          <p className="md:text-md">{footerDescription}</p>
          <div className="mt-6 md:mt-8">
            <Button
              variant={button.variant}
              size={button.size}
              iconRight={button.iconRight}
              iconLeft={button.iconLeft}
            >
              {button.title}
            </Button>
          </div>
        </div>
      
    </section>
  );
};

export const Faq7Defaults: Faq7Props = {
  
  questions: [
    {
      title: "Question text goes here",
      answer:
        "Guests can browse public events and view event details without needing to sign in.Guests cannot purchase tickets or create events.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
  ],
  footerHeading: "Still have questions?",
  footerDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: {
    title: "Contact",
    variant: "secondary",
  },
};

Faq7.displayName = "Faq7";
