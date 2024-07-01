import { useEffect, useState } from "react";
import type { Establisment } from "../../interfaces/establisment.interface";
import { PrevButton } from "./prev-button.component";
import { NextButton } from "./next-button.component";
import {
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { firestore } from "../../db/firebase/client";

export const Table = () => {
  const initialDataCountPerPage = 10;
  const initialCurrentPageNumber = 1;
  const initialCountPages = 0;
  const [establishments, setEstablisments] = useState<Establisment[]>([]);
  const [tableData, setTableData] = useState<Establisment[]>();
  const [dataCountPerPage, setDataCountPerPage] = useState(
    initialDataCountPerPage
  );
  const [currentPageNumber, setCurrentPageNumber] = useState(
    initialCurrentPageNumber
  );
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [countPages, setCountPages] = useState(initialCountPages);
  const [search, setSearch] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const getEstablishments = async () => {
      try {
        // const data = await fetch("http://universities.hipolabs.com/search");
        // const universities = (await data.json()) as HippolabsDTO[];
        // const establishments: Establisment[] = universities.map((university) =>
        //   hippolabstoEstablisment(university)
        // );
        const q = query(collection(firestore, "establisments"), limit(30));
        const querySnapshot = await getDocs(q);

        const establishments: Establisment[] = [];
        querySnapshot.forEach((doc) => {
          establishments.push({ id: doc.id, ...doc.data() } as Establisment);
        });

        setEstablisments(establishments);
        const countPages = Math.ceil(
          establishments.length / initialDataCountPerPage
        );
        setCountPages(countPages);
        const arrayOfNumbers: number[] = [];
        for (let index = 0; index < countPages; index++) {
          arrayOfNumbers.push(index + 1);
        }
        setPageNumbers(arrayOfNumbers);

        const tableData = [];
        for (
          let index =
            initialCurrentPageNumber * initialDataCountPerPage -
            initialDataCountPerPage;
          index < initialCurrentPageNumber * initialDataCountPerPage;
          index++
        ) {
          tableData.push(establishments[index]);
        }
        setTableData(tableData);
        setIsloading(false);
      } catch (error) {
        console.log({ error });
        setTableData([]);
        setEstablisments([]);
        setDataCountPerPage(initialDataCountPerPage);
        setCurrentPageNumber(initialCurrentPageNumber);
        setPageNumbers([]);
        setCountPages(initialCountPages);
        setIsloading(false);
      }
    };

    getEstablishments();
  }, []);

  const handleNextClick = () => {
    setCurrentPageNumber((prev) => {
      const currentPageNumber = prev + 1 > countPages ? countPages : prev + 1;
      const tableData = [];

      const from = currentPageNumber * dataCountPerPage - dataCountPerPage;
      const to =
        currentPageNumber * dataCountPerPage > establishments.length
          ? establishments.length
          : currentPageNumber * dataCountPerPage;
      for (let index = from; index < to; index++) {
        tableData.push(establishments[index]);
      }

      setTableData(tableData);

      return currentPageNumber;
    });
  };

  const handlePrevClick = async () => {
    setCurrentPageNumber((prev) => {
      const currentPageNumber = prev - 1 < 1 ? 1 : prev - 1;

      const tableData = [];

      const from = currentPageNumber * dataCountPerPage - dataCountPerPage;
      const to =
        currentPageNumber * dataCountPerPage > establishments.length
          ? establishments.length
          : currentPageNumber * dataCountPerPage;
      for (let index = from; index < to; index++) {
        tableData.push(establishments[index]);
      }

      setTableData(tableData);

      return currentPageNumber;
    });
  };

  const handlePerPageClick = (dataCountPerPage: number) => {
    setDataCountPerPage(() => {
      const countPages = Math.ceil(establishments.length / dataCountPerPage);

      setCountPages(countPages);

      const arrayOfNumbers: number[] = [];
      for (let index = 0; index < countPages; index++) {
        arrayOfNumbers.push(index + 1);
      }
      setPageNumbers(arrayOfNumbers);

      setCurrentPageNumber((prevCurrentPageNumber) => {
        let currentPageNumber: number;
        if (countPages < prevCurrentPageNumber) {
          currentPageNumber = countPages;
        } else {
          currentPageNumber = prevCurrentPageNumber;
        }

        const tableData = [];

        const from = currentPageNumber * dataCountPerPage - dataCountPerPage;
        const to =
          currentPageNumber * dataCountPerPage > establishments.length
            ? establishments.length
            : currentPageNumber * dataCountPerPage;

        for (let index = from; index < to; index++) {
          tableData.push(establishments[index]);
        }

        setTableData(tableData);

        return currentPageNumber;
      });

      return dataCountPerPage;
    });
  };

  const handleCurrentPageNumber = (currentPageNumber: number) => {
    setCurrentPageNumber(() => {
      const tableData = [];

      const from = currentPageNumber * dataCountPerPage - dataCountPerPage;
      const to =
        currentPageNumber * dataCountPerPage > establishments.length
          ? establishments.length
          : currentPageNumber * dataCountPerPage;

      for (let index = from; index < to; index++) {
        tableData.push(establishments[index]);
      }

      setTableData(tableData);

      return currentPageNumber;
    });
  };

  const handleSearchButton: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      // const data = await fetch(
      //   "http://universities.hipolabs.com/search?name=" + search
      // );
      // const universities = (await data.json()) as HippolabsDTO[];
      // const establishments: Establisment[] = universities.map((university) =>
      //   hippolabstoEstablisment(university)
      // );
      setIsloading(true);
      const q = query(collection(firestore, "establisments"), limit(30));
      const querySnapshot = await getDocs(q);

      let establishments: Establisment[] = [];
      querySnapshot.forEach((doc) => {
        establishments.push({ id: doc.id, ...doc.data() } as Establisment);
      });

      if (search.trim() !== "") {
        establishments = establishments.filter((e) =>
          e.name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(search.toLowerCase().split(" ").join())
        );
      }

      if (establishments != null && establishments.length > 0) {
        setEstablisments(establishments);
        let countPerPage = establishments.length;
        if (establishments.length >= 5) {
          countPerPage = 5;
        }
        if (establishments.length >= 10) {
          countPerPage = 10;
        }
        if (establishments.length >= 15) {
          countPerPage = 15;
        }
        if (establishments.length >= 20) {
          countPerPage = 20;
        }
        const countPages =
          Math.ceil(establishments.length / countPerPage) <= 0
            ? 1
            : Math.ceil(establishments.length / countPerPage);
        const pageNumber = 1;
        setCurrentPageNumber(pageNumber);
        setDataCountPerPage(countPerPage);
        setCountPages(countPages);
        const arrayOfNumbers: number[] = [];
        for (let index = 0; index < countPages; index++) {
          arrayOfNumbers.push(index + 1);
        }
        setPageNumbers(arrayOfNumbers);

        const tableData = [];
        for (
          let index = pageNumber * countPerPage - countPerPage;
          index < pageNumber * countPerPage;
          index++
        ) {
          tableData.push(establishments[index]);
        }
        setTableData(tableData);
        console.log({ tableData });
      } else {
        setTableData([]);
        setEstablisments([]);
        setDataCountPerPage(initialDataCountPerPage);
        setCurrentPageNumber(initialCurrentPageNumber);
        setPageNumbers([]);
        setCountPages(initialCountPages);
      }
      setIsloading(false);
    } catch (error) {
      console.log({ error });
      setTableData([]);
      setEstablisments([]);
      setDataCountPerPage(initialDataCountPerPage);
      setCurrentPageNumber(initialCurrentPageNumber);
      setPageNumbers([]);
      setCountPages(initialCountPages);
      setIsloading(false);
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    setSearch(value);
  };

  return (
    <>
      <h2 className="uppercase text-green text-center text-3xl mb-8">
        find an establisment
      </h2>
      <div className="flex flex-row gap-4 mb-8">
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <input
            onChange={handleInputChange}
            type="text"
            className="grow"
            placeholder="Search"
          />
        </label>
        <button
          onClick={handleSearchButton}
          className="btn bg-green text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            ></path>
          </svg>
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : tableData != null && tableData.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex flex-row justify-between items-center mb-4">
            <PrevButton onClick={handlePrevClick} />
            <div>
              <span>Page</span>
              <div className="dropdown dropdown-bottom ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-green text-white"
                >
                  {currentPageNumber}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 max-h-96 shadow flex flex-column flex-nowrap overflow-y-scroll"
                >
                  {pageNumbers.map((num) => (
                    <li onClick={() => handleCurrentPageNumber(num)} key={num}>
                      <a>{num}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <span>of {countPages}</span>
            </div>
            <div>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-green text-white"
                >
                  Show {dataCountPerPage} results per page
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
                >
                  {[5, 10, 15, 20].map((num) =>
                    num < establishments.length ? (
                      <li key={num}>
                        <a onClick={() => handlePerPageClick(num)}>{num}</a>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
            <NextButton onClick={handleNextClick} />
          </div>
          <table className="table table-zebra">
            <thead className="bg-green text-white">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Country</th>
                <th>Classification</th>
                <th>Parents</th>
              </tr>
            </thead>
            <tbody>
              {tableData != null && tableData.length > 0
                ? tableData
                    .filter((d) => d != null)
                    .map((establishment, index) => (
                      <tr
                        key={`${establishment.name}${establishment.country}${
                          establishment.classification
                        }${Math.random()}`}
                        className="even:!bg-gold"
                      >
                        <td>{index + 1}</td>
                        <td>{establishment.name}</td>
                        <td>{establishment.country}</td>
                        <td>{establishment.classification}</td>
                        <td>{establishment.parent || ""}</td>
                      </tr>
                    ))
                : null}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-4xl text-gold">No Results Found</p>
        </div>
      )}
    </>
  );
};
