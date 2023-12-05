import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const [students, setStudents] = useState([]);

  const remove = (id) => {
    try {
      const response = axios.delete(
        `http://localhost:3582/delete/${id}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await axios.get("http://localhost:3582/students");

        // Assuming the data is an array, update the state with the response data
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, [students]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Students</h2>
        </div>
        <div>
          <Link
            to={"/addStudent"}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new student
          </Link>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      <span>Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Roll
                    </th>
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {students.map((value) => (
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {value?.studentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm text-gray-900">
                          {value?.class}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5">
                          {value?.roll}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-7 text-right text-sm font-medium flex justify-evenly">
                        <Link
                          to={`/editStudent/${value?._id}`}
                          className="text-gray-500 hover:text-indigo-600"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(value?._id)}
                          className="text-gray-500 hover:text-indigo-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllStudents;
