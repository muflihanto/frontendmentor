import Head from "next/head";
import Image from "next/image";
// import dynamic from "next/dynamic";
// const Slider = dynamic(() => import("../components/Slider"), { ssr: false });
import _data from "../public/static-job-listings/data.json";
import { Fragment, HTMLProps, PropsWithChildren, useEffect, useMemo } from "react";
import { atom, useAtom, useSetAtom } from "jotai";

// TODO: View the optimal layout for the site depending on their device's screen size
// TODO: See hover states for all interactive elements on the page
// TODO: Filter job listings based on the categories

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
      <div className="App font-league-spartan bg-job-listings-neutral-100 relative min-h-[100svh] font-medium">
        <Header />
        <Main />
        <Footer />
        {/* <Slider
          basePath="/static-job-listings/design"
          // absolutePath="/static-job-listings/design/mobile-with-filters.jpg"
        /> */}
      </div>
    </>
  );
}

function Header() {
  return <header className="bg-job-listings-primary aspect-[375/156] max-h-[250px] w-full bg-[url('/static-job-listings/images/bg-header-mobile.svg')] bg-cover" />;
}

function Badge({ children, variant }: PropsWithChildren<{ variant: "new" | "featured" }>) {
  return <div className={`flex h-6 items-center justify-center rounded-full text-[14px] font-bold uppercase leading-none tracking-tight text-white ${variant === "new" ? "bg-job-listings-primary pl-2 pr-[9px] pt-[3px]" : "bg-job-listings-neutral-400 pl-[10px] pr-[9px] pt-[1px]"}`}>{children}</div>;
}

function Categories({ children, onClick }: PropsWithChildren<HTMLProps<HTMLButtonElement>>) {
  return (
    <button
      className="bg-job-listings-neutral-200 text-job-listings-primary flex h-[32px] items-center justify-center rounded pl-2 pr-[12px] pt-[2px] font-bold tracking-[-0.2px]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function FilterButton({ children, onClick }: PropsWithChildren<HTMLProps<HTMLButtonElement>>) {
  return (
    <div className="bg-job-listings-neutral-100 text-job-listings-primary flex h-[32px] items-center rounded font-bold">
      <div className="px-2">{children}</div>
      <button
        onClick={onClick}
        className="bg-job-listings-primary ml-auto flex h-8 w-8 items-center justify-center rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={14}
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
          />
        </svg>
      </button>
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const setFilters = useSetAtom(filterAtom);

  return (
    <div className={`shadow-job-listings-primary/20 relative mt-2 rounded-[5px] bg-white pb-6 pr-[23px] shadow-lg ${job.featured ? "border-l-job-listings-primary border-l-[5px] pl-[19px] pt-8" : "pl-[24px] pt-[32px]"}`}>
      <Image
        width={48}
        height={48}
        alt={`${job.company} ${job.position}`}
        src={"/static-job-listings" + job.logo.slice(1)}
        className={`absolute top-0 -translate-y-1/2 ${job.featured ? "left-[19px]" : "left-[24px]"}`}
      />
      <div className="flex h-[24px] items-center gap-2">
        <div className="text-job-listings-primary mr-4 pt-[1px] text-[15px] font-bold leading-none">{job.company}</div>
        {job.new && <Badge variant="new">new!</Badge>}
        {job.featured && <Badge variant="featured">featured</Badge>}
      </div>
      <div className="text-job-listings-neutral-400 mt-[13px] text-[15px] font-bold leading-none">{job.position}</div>
      <div className="text-job-listings-neutral-300 mt-[13px] flex gap-[9px]">
        <div>{job.postedAt}</div>
        <div>&middot;</div>
        <div>{job.contract}</div>
        <div>&middot;</div>
        <div>{job.location}</div>
      </div>
      <hr className="border-t-job-listings-neutral-300/75 mb-4 mt-[15px]" />
      <div className="flex flex-wrap gap-4">
        <Categories
          onClick={() => {
            setFilters((filter) => {
              return { ...filter, roles: filter.roles.add(job.role) };
            });
          }}
        >
          {job.role}
        </Categories>
        <Categories
          onClick={() => {
            setFilters((filter) => {
              return { ...filter, levels: filter.levels.add(job.level) };
            });
          }}
        >
          {job.level}
        </Categories>
        {job.languages.length > 0 &&
          job.languages.map((lang, index) => {
            return (
              <Categories
                key={index}
                onClick={() => {
                  setFilters((filter) => {
                    return { ...filter, languages: filter.languages.add(lang) };
                  });
                }}
              >
                {lang}
              </Categories>
            );
          })}
        {job.tools.length > 0 &&
          job.tools.map((tool, index) => {
            return (
              <Categories
                key={index}
                onClick={() => {
                  setFilters((filter) => {
                    return { ...filter, tools: filter.tools.add(tool) };
                  });
                }}
              >
                {tool}
              </Categories>
            );
          })}
      </div>
    </div>
  );
}

function Main() {
  const [filters, setFilters] = useAtom(filterAtom);
  const filteredJob: Job[] = Object.values(filters).every((key) => key.size === 0)
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
      Object.values(filters)
        .map((set) => Array.from(set))
        .flat().length === 0
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

  return (
    <div className="flex w-full flex-col items-center">
      {!isFilterEmpty && (
        <div className="flex min-h-[72px] w-[calc(100%-48px)] -translate-y-[36px] items-center justify-between rounded bg-white p-5 shadow-lg">
          <div className="flex flex-wrap gap-4">
            {(Object.entries(filters) as FilterEntries).map((entry, index) => {
              if (entry[1].size === 0) {
                return null;
              } else {
                return (
                  <Fragment key={index}>
                    {Array.from(entry[1]).map((e, eindex) => {
                      const onClick = () => {
                        if (entry[0] === "languages") {
                          setFilters((filt) => {
                            const newSet = filt.languages;
                            newSet.delete(e as Language);
                            return { ...filt, languages: newSet };
                          });
                        } else if (entry[0] === "levels") {
                          setFilters((filt) => {
                            const newSet = filt.levels;
                            newSet.delete(e as Level);
                            return { ...filt, levels: newSet };
                          });
                        } else if (entry[0] === "roles") {
                          setFilters((filt) => {
                            const newSet = filt.roles;
                            newSet.delete(e as Role);
                            return { ...filt, roles: newSet };
                          });
                        } else {
                          setFilters((filt) => {
                            const newSet = filt.tools;
                            newSet.delete(e as Tool);
                            return { ...filt, tools: newSet };
                          });
                        }
                      };
                      return (
                        <FilterButton
                          key={eindex}
                          onClick={onClick}
                        >
                          {e}
                        </FilterButton>
                      );
                    })}
                  </Fragment>
                );
              }
            })}
          </div>
          <button
            className="text-job-listings-neutral-300 h-[24px] px-[6px] pt-[2px] font-bold leading-none"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      )}
      <div className={`flex w-full flex-col gap-8 px-6 pb-[34px] ${isFilterEmpty ? "pt-12" : "pt-3"}`}>
        {filteredJob.map((job, index) => {
          return (
            <Card
              key={index}
              job={job}
            />
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="absolute bottom-2 w-full text-center text-[11px] [&_a]:font-bold [&_a]:underline [&_a]:decoration-red-500 [&_a]:decoration-wavy">
      Challenge by{" "}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a
        href="https://github.com/muflihanto"
        target="_blank"
        rel="noreferrer"
      >
        Muflihanto
      </a>
      .
    </footer>
  );
}
