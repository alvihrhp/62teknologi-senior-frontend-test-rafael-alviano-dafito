import React, { ReactElement, useState, useEffect, useRef } from "react";
/** Components */
import { Card, Banner, Input } from "../../components";
/** React Router */
import { useNavigate, NavigateFunction } from "react-router-dom";
/** Images */
import BannerImage from "../../assets/background.jpeg";
import BannerLogo from "../../assets/banner_logo.png";
import LosAngeles from "../../assets/los_angeles_yelp.jpeg";
import NewYork from "../../assets/new_york_yelp.jpeg";
import SanFransico from "../../assets/san_fransisco_yelp.jpeg";
import Seattle from "../../assets/seattle_yelp.jpeg";
/** Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/** classnames */
import classnames from "classnames";
/** Helper */
import fetchHeler from "../../helper/fetchHelper";
/** Swal */
import Swal from "sweetalert2";

interface Query {
  location: string;
  term: string;
  price: number[];
  categories: string[];
  open_now: boolean;
}

type QueryKey = "location" | "term" | "price" | "categories" | "open_now";

interface Props {}

const Home: React.FC<Props> = (): ReactElement => {
  const [query, setQuery] = useState<Query>({
    location: "",
    term: "",
    price: [],
    categories: [],
    open_now: false,
  });

  const [inputs, setInputs] = useState<{ [key: string]: any }[]>([
    {
      type: "text",
      name: "search-business",
      value: "",
      placeholder: "Search Businesses",
    },
  ]);

  const [prices, setPrices] = useState<{ [key: string]: any }[]>([
    {
      value: 1,
      isActive: false,
    },
    {
      value: 2,
      isActive: false,
    },
    {
      value: 3,
      isActive: false,
    },
    {
      value: 4,
      isActive: false,
    },
  ]);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

  const [categories, setCategories] = useState<{ [key: string]: any }[]>([
    {
      alias: "french",
      title: "French",
      isActive: false,
    },
    {
      alias: "italian",
      title: "Italian",
      isActive: false,
    },
    {
      alias: "steak",
      title: "Steak",
      isActive: false,
    },
    {
      alias: "halal",
      title: "Halal",
      isActive: false,
    },
  ]);

  const [isOpenNow, setIsOpenNow] = useState<{ [key: string]: any }[]>([
    {
      alias: "open_now",
      title: "Open Now ?",
      isActive: false,
    },
  ]);

  const [locations, setLocations] = useState<{ [key: string]: any }[]>([
    {
      title: "New York",
      image: NewYork,
      isActive: false,
      data: [],
    },
    {
      title: "Los Angele",
      image: LosAngeles,
      isActive: false,
      data: [],
    },
    {
      title: "San Fransisco",
      image: SanFransico,
      isActive: false,
      data: [],
    },
    {
      title: "Seattle",
      image: Seattle,
      isActive: false,
      data: [],
    },
  ]);

  const fetchData = async (): Promise<void> => {
    try {
      if (!query.location.length) {
        console.log("masuk");
        throw new Error("Select a location first");
      }

      let url: string = `location=${encodeURIComponent(query.location)}`;

      let key: QueryKey;

      for (key in query) {
        const value: string | string[] | number[] | boolean = query[key];
        if (key !== "location") {
          if (typeof value === "boolean" && value) {
            url += `&open_now=${value}`;
          } else if (typeof value === "string" && value.length > 0) {
            url += `&${key}=${value}`;
          } else if (Array.isArray(value) && value.length > 0) {
            url += `&${key}=${value.join(",")}`;
          }
        }
      }

      const res = await fetchHeler(url, "GET");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    }
  };

  const handleClickLocation = (title: string): void => {
    let activeLocation: string = "";

    const newLocations = locations.map((location: { [key: string]: any }) => {
      if (location.title === title) {
        activeLocation = title;
        return {
          ...location,
          isActive: true,
        };
      }
      return {
        ...location,
        isActive: false,
      };
    });

    setQuery({ ...query, location: activeLocation });

    setLocations(newLocations);
  };

  const handlePriceClick = (value: number): void => {
    const newPrices: { [key: string]: any }[] = prices.map(
      (price: { [key: string]: any }) => {
        if (price.value === value) {
          return {
            ...price,
            isActive: !price.isActive,
          };
        }
        return {
          ...price,
        };
      }
    );

    const rangePrice: number[] = [];

    newPrices.forEach((price: { [key: string]: any }) => {
      if (price.isActive) {
        rangePrice.push(price.value);
      }
    });

    setPrices(newPrices);

    setQuery({ ...query, price: rangePrice });
  };

  const renderFilterAndSearch = (): ReactElement => (
    <div className="w-full py-4 flex flex-wrap justify-center items-center">
      <div className="w-[25%] px-4 border-r-2 max-w-[336px]">
        <Input attr={inputs[0]} inputs={inputs} setInputs={setInputs} />
      </div>
      <div className="h-[44px] px-4 border-r-2 flex flex-wrap justify-center items-center">
        {prices.map((price: { [key: string]: any }, priceIdx: number) => (
          <div className="px-3" key={priceIdx}>
            {new Array(price.value)
              .fill(price.value)
              .map((value: number, valueIdx: number) => (
                <FontAwesomeIcon
                  icon={["fas", "dollar-sign"]}
                  key={valueIdx}
                  className={classnames("text-2xl cursor-pointer", {
                    ["text-white"]: !price.isActive,
                    ["text-[#bd291e]"]: price.isActive,
                  })}
                  onClick={(e: React.MouseEvent) => {
                    handlePriceClick(value);
                  }}
                />
              ))}
          </div>
        ))}
      </div>
      <div className="h-[44px] px-4 border-r-2 relative ">
        <div
          className="h-full flex items-center cursor-pointer"
          onClick={() => {
            setIsCategoriesOpen(!isCategoriesOpen);
            setQuery({ ...query, open_now: !query.open_now });
          }}
        >
          <span className="text-2xl text-white">Categories</span>
          <FontAwesomeIcon
            icon={["fas", !isCategoriesOpen ? "caret-down" : "caret-up"]}
            className="text-2xl text-white ml-4"
          />
        </div>
        {isCategoriesOpen && (
          <div className="w-full absolute bottom-[-197px] left-0 z-20 px-2">
            <FontAwesomeIcon
              icon={["fas", "caret-up"]}
              className="text-[#bd291e] text-2xl relative left-[14px]"
            />
            <Card style="bg-[#bd291e] relative top-[-13px] w-full rounded p-2">
              {categories.map(
                (category: { [key: string]: any }, categoryIdx: number) => (
                  <div
                    className="w-full flex flex-wrap items-center my-2"
                    key={categoryIdx}
                  >
                    <Input
                      attr={{
                        type: "checkbox",
                        name: category.alias,
                        id: category.alias,
                        checked: category.isActive,
                      }}
                      inputs={categories}
                      setInputs={setCategories}
                    />
                    <label className="text-white text-xl ml-2">
                      {category.title}
                    </label>
                  </div>
                )
              )}
            </Card>
          </div>
        )}
      </div>
      <div className="h-[44px] flex flex-wrap items-center px-4">
        <Input
          attr={{
            type: "checkbox",
            name: isOpenNow[0].alias,
            id: isOpenNow[0].alias,
            checked: isOpenNow[0].isActive,
          }}
          inputs={isOpenNow}
          setInputs={setIsOpenNow}
        />
        <span className="ml-4 text-white text-2xl">{isOpenNow[0].title}</span>
      </div>
    </div>
  );

  useEffect(() => {
    if (inputs[0].value.length) {
      setQuery({ ...query, term: inputs[0].value });
    }
  }, [inputs]);

  useEffect(() => {
    if (isCategoriesOpen) {
      const filterCategorie: string[] = [];

      categories.forEach((category: { [key: string]: any }) => {
        if (category.isActive) {
          filterCategorie.push(category.value);
        }
      });

      setQuery({ ...query, categories: filterCategorie });
    }
  }, [categories]);

  useEffect(() => {
    if (query.location.length) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="w-full">
      <div className="w-full h-[600px]">
        <Banner
          bgImage={BannerImage}
          bgStyle="bg-neutral-600/[0.8]"
          wrapperStyle="flex flex-wrap items-center justify-center"
        >
          <img
            src={BannerLogo}
            className="absolute w-[200px] z-10 top-0 left-0"
          />
          <h1 className="relative z-10 font-bold text-white text-[70px]">
            "Where ideas became reality"
          </h1>
        </Banner>
        <Card style="bg-[#bd291e]/[0.7]">{renderFilterAndSearch()}</Card>
        <div className="w-full py-4 border-b-4">
          <div className="w-full flex flex-wrap gap-[18.7px] px-4">
            {locations.map(
              (location: { [key: string]: any }, locationIdx: number) => (
                <div
                  className="w-[24%] h-[200px]"
                  key={locationIdx}
                  onClick={(e: React.MouseEvent) =>
                    handleClickLocation(location.title)
                  }
                >
                  <Card
                    key={locationIdx}
                    style="h-full rounded-lg cursor-pointer"
                  >
                    <Banner
                      bgImage={location.image}
                      wrapperStyle="flex flex-wrap justify-center items-end rounded"
                      bgStyle="bg-neutral-600/[0.8] rounded-lg transition duration-0 hover:bg-[#bd291e]/[0.7]"
                      imgStyle="rounded"
                    >
                      <h1 className="relative z-10 text-white mb-3 text-2xl">
                        {location.title}
                      </h1>
                    </Banner>
                  </Card>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
