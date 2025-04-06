import Head from "next/head";
import Image from "next/image";
import _data from "../public/static-job-listings/data.json";
import {
  Fragment,
  type HTMLProps,
  type PropsWithChildren,
  useMemo,
} from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { leagueSpartan } from "../utils/fonts/leagueSpartan";

// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/SliderTs"), { ssr: false });

// TODO: View the optimal layout for the site depending on their device's screen size

type Job = {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: Role;
  level: Level;
  postedAt: string;
  contract: string;
  location: string;
  languages: Language[];
  tools: Tool[];
};
type Role = "Frontend" | "Backend" | "Fullstack";
type Level = "Junior" | "Midweight" | "Senior";
type Language = "Python" | "Ruby" | "JavaScript" | "HTML" | "CSS";
type Tool = "React" | "Sass" | "Vue" | "Django" | "RoR (Ruby on Rails)";
type Filter = {
  languages: Set<Language>;
  levels: Set<Level>;
  roles: Set<Role>;
  tools: Set<Tool>;
};
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
type FilterEntries = Entries<Filter>;
// type ExtractSet<Type> = Type extends Set<infer X> ? X : never;

const initFilter: Filter = {
  languages: new Set(),
  levels: new Set(),
  roles: new Set(),
  tools: new Set(),
};
const data = _data as unknown as Job[];
const filterAtom = atom<Filter>(initFilter);

export default function StaticJobListings() {
  return (
    <>
      <Head>
        <title>Frontend Mentor | Job Listings</title>
      </Head>
      <div
        className={`App relative min-h-[100svh] bg-job-listings-neutral-100 font-league-spartan font-medium ${leagueSpartan.variable}`}
      >
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/static-job-listings/design"
          // absolutePath="/static-job-listings/design/mobile-with-filters.jpg"
          absolutePath="/static-job-listings/design/active-states.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  return (
    <header className="aspect-[375/156] max-h-[250px] w-full bg-job-listings-primary bg-[url('/static-job-listings/images/bg-header-mobile.svg')] bg-cover lg:aspect-auto lg:h-[156px] lg:bg-[url('/static-job-listings/images/bg-header-desktop.svg')]" />
  );
}

function Badge({
  children,
  variant,
  ...props
}: PropsWithChildren<
  HTMLProps<HTMLDivElement> & { variant: "new" | "featured" }
>) {
  return (
    <div
      className={`flex h-6 items-center justify-center rounded-full text-[14px] font-bold uppercase leading-none tracking-tight text-white ${
        variant === "new"
          ? "bg-job-listings-primary pl-2 pr-[9px] pt-[3px]"
          : "bg-job-listings-neutral-400 pl-[10px] pr-[9px] pt-[1px]"
      }`}
      aria-label={props["aria-label"]}
    >
      {children}
    </div>
  );
}

function Category({
  children,
  onClick,
  ...props
}: PropsWithChildren<HTMLProps<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      className="flex h-[32px] items-center justify-center rounded bg-job-listings-neutral-200 pl-2 pr-[12px] pt-[2px] font-bold tracking-[-0.2px] text-job-listings-primary hover:bg-job-listings-primary hover:text-job-listings-neutral-100 lg:px-[9px]"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function FilterButton({
  children,
  onClick,
}: PropsWithChildren<HTMLProps<HTMLButtonElement>>) {
  return (
    <div className="flex h-[32px] items-center rounded bg-job-listings-neutral-100 font-bold text-job-listings-primary">
      <div className="px-2 lg:pr-[10px] lg:pt-[2px]" aria-hidden="true">
        {children}
      </div>
      <button
        onClick={onClick}
        className="ml-auto flex h-8 w-8 items-center justify-center rounded-r bg-job-listings-primary hover:bg-job-listings-neutral-400"
        type="button"
        aria-label={`Remove filter: ${children as string}`}
        title={`Remove filter: ${children as string}`}
      >
        <svg
          viewBox="0 0 14 14"
          className="pointer-events-none w-[14px]"
          aria-hidden="true"
        >
          <use href="/static-job-listings/images/icon-remove.svg#icon-remove" />
        </svg>
        <span className="sr-only">{children}</span>
      </button>
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const setFilters = useSetAtom(filterAtom);

  return (
    <div
      className={`relative rounded-[5px] bg-white pb-6 pr-[23px] shadow-lg shadow-job-listings-primary/20 lg:flex lg:h-[152px] lg:items-center lg:px-8 lg:py-8 xl:px-10 ${
        job.featured
          ? "border-l-[5px] border-l-job-listings-primary pl-[19px] pt-8 lg:pl-[35px]"
          : "pl-[24px] pt-[32px]"
      }`}
      role="listitem"
      aria-labelledby={`job-${job.id}`}
    >
      <div
        className={`absolute top-0 aspect-square w-12 -translate-y-1/2 lg:relative lg:left-auto lg:w-[88px] lg:transform-none ${
          job.featured ? "left-[19px]" : "left-[24px]"
        }`}
      >
        <Image
          fill
          alt={`${job.company} ${job.position}`}
          src={`/static-job-listings${job.logo.slice(1)}`}
        />
      </div>
      <div className="lg:ml-6">
        <div className="flex h-[24px] items-center gap-2 lg:mt-[1px]">
          <div
            className="mr-4 pt-[1px] text-[15px] font-bold leading-none text-job-listings-primary lg:mr-2 lg:pb-[2px] lg:text-[18px]"
            id={`job-${job.id}`}
          >
            {job.company}
          </div>
          {job.new && (
            <Badge variant="new" aria-label="New job posting">
              new!
            </Badge>
          )}
          {job.featured && (
            <Badge variant="featured" aria-label="Featured job posting">
              featured
            </Badge>
          )}
        </div>
        <a
          className="mt-[13px] block cursor-pointer text-[15px] font-bold leading-none text-job-listings-neutral-400 hover:text-job-listings-primary lg:mt-[11px] lg:text-[22px]"
          aria-label={`${job.position} at ${job.company}`}
        >
          {job.position}
        </a>
        <div
          className="mt-[13px] flex gap-[9px] text-job-listings-neutral-300 lg:mt-[6px] lg:gap-[15px] lg:text-[18px]"
          role="group"
          aria-label="Job Details"
        >
          <div>{job.postedAt}</div>
          <div aria-hidden="true">&middot;</div>
          <div>{job.contract}</div>
          <div aria-hidden="true">&middot;</div>
          <div>{job.location}</div>
        </div>
      </div>
      <hr className="mb-4 mt-[15px] border-t-job-listings-neutral-300/75 lg:hidden" />
      <div className="flex flex-wrap gap-4 lg:ml-auto lg:gap-[17px]">
        <Category
          onClick={() => {
            setFilters((filter) => {
              return { ...filter, roles: filter.roles.add(job.role) };
            });
          }}
          aria-label={`Filter by role: ${job.role}`}
          title={`Filter by role: ${job.role}`}
        >
          {job.role}
        </Category>
        <Category
          onClick={() => {
            setFilters((filter) => {
              return { ...filter, levels: filter.levels.add(job.level) };
            });
          }}
          aria-label={`Filter by level: ${job.level}`}
          title={`Filter by level: ${job.level}`}
        >
          {job.level}
        </Category>
        {job.languages.length > 0 &&
          job.languages.map((lang, index) => {
            return (
              <Category
                key={`${index}-${lang}`}
                onClick={() => {
                  setFilters((filter) => {
                    return { ...filter, languages: filter.languages.add(lang) };
                  });
                }}
                aria-label={`Filter by language: ${lang}`}
                title={`Filter by language: ${lang}`}
              >
                {lang}
              </Category>
            );
          })}
        {job.tools.length > 0 &&
          job.tools.map((tool, index) => {
            return (
              <Category
                key={`${index}-${tool}`}
                onClick={() => {
                  setFilters((filter) => {
                    return { ...filter, tools: filter.tools.add(tool) };
                  });
                }}
                aria-label={`Filter by tool: ${tool}`}
                title={`Filter by tool: ${tool}`}
              >
                {tool}
              </Category>
            );
          })}
      </div>
    </div>
  );
}

function Main() {
  const [filters, setFilters] = useAtom(filterAtom);
  const filteredJob: Job[] = Object.values(filters).every(
    (key) => key.size === 0,
  )
    ? data
    : data.filter((dat) => {
        return (Object.entries(filters) as FilterEntries).every((filter) => {
          if (filter[1].size === 0) return true;

          if (filter[0] === "levels") {
            if (!filter[1].has(dat.level)) return false;
          } else if (filter[0] === "roles") {
            if (!filter[1].has(dat.role)) return false;
          } else if (filter[0] === "languages") {
            for (const f of Array.from(filter[1])) {
              if (!dat.languages.includes(f)) return false;
            }
          } else {
            for (const f of Array.from(filter[1])) {
              if (!dat.tools.includes(f)) return false;
            }
          }

          return true;
        });
      });

  const isFilterEmpty = useMemo(() => {
    return (
      Object.values(filters).flatMap((set) => Array.from(set)).length === 0
    );
  }, [filters]);

  const handleClear = () => {
    setFilters({
      languages: new Set(),
      levels: new Set(),
      roles: new Set(),
      tools: new Set(),
    });
  };

  // const handleDelete = <T,>(set: Set<T>, e: T) => {};

  return (
    <main
      className="flex w-full flex-col items-center"
      aria-labelledby="job-list"
    >
      <h1 className="sr-only" id="job-list">
        Static Job Listings
      </h1>
      {!isFilterEmpty && (
        <fieldset
          className="flex min-h-[72px] w-[calc(100%-48px)] -translate-y-[36px] items-center justify-between rounded bg-white p-5 shadow-lg shadow-job-listings-primary/20 lg:w-[calc(100%-330px)] lg:px-10"
          aria-labelledby="filters-legend"
        >
          <legend id="filters-legend" className="sr-only">
            Active Filters
          </legend>
          <div className="flex flex-wrap gap-4 lg:gap-[15px]">
            {(Object.entries(filters) as FilterEntries).map((entry, index) => {
              if (entry[1].size === 0) return null;
              return (
                <Fragment key={`${index}-${entry[0]}`}>
                  {Array.from(entry[1]).map((e, eindex) => {
                    const onClick = () => {
                      setFilters((filt) => {
                        const newSet = filt[entry[0]];
                        match(entry[0])
                          .with("languages", () => {
                            (newSet as Set<Language>).delete(e as Language);
                          })
                          .with("levels", () => {
                            (newSet as Set<Level>).delete(e as Level);
                          })
                          .with("roles", () => {
                            (newSet as Set<Role>).delete(e as Role);
                          })
                          .with("tools", () => {
                            (newSet as Set<Tool>).delete(e as Tool);
                          })
                          .exhaustive();
                        return { ...filt, [entry[0]]: newSet };
                      });
                    };
                    return (
                      <FilterButton key={`${eindex}-${e}`} onClick={onClick}>
                        {e}
                      </FilterButton>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
          <button
            className="h-[24px] px-[6px] pt-[2px] font-bold leading-none text-job-listings-neutral-300"
            onClick={handleClear}
            type="button"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </fieldset>
      )}
      <div
        className={`flex w-full flex-col gap-10 px-6 pb-[34px] lg:gap-6 lg:px-10 lg:pb-[120px] xl:px-[165px] ${
          isFilterEmpty ? "pt-14 lg:pt-[75px]" : "pt-5 lg:pt-[3px]"
        }`}
        role="list"
        aria-labelledby="job-list"
      >
        {filteredJob.map((job, index) => {
          return <Card key={`${index}-${job.id}`} job={job} />;
        })}
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-2 w-full text-center text-[11px] text-job-listings-neutral-400 lg:bottom-4 [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/muflihanto" target="_blank" rel="noreferrer">
        Muflihanto
      </a>
      .
    </footer>
  );
}
