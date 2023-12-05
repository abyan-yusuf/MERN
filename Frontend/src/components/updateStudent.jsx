import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const updatedData = {};

  const submit = async (e) => {
    e.preventDefault();
    const studentName = e.target.name.value;
    const studentClass = e.target.class.value;
    const studentRoll = e.target.roll.value;

    const updatedData = {
      studentName: studentName,
      class: studentClass,
      roll: studentRoll,
    };

    try {
      const response = await axios.put(
        `http://localhost:3582/update/${id}`,
        updatedData
      );
      console.log("Response:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [student, setStudent] = useState([]);

  useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await axios.get(
          `http://localhost:3582/students/${id}`
        );

        // Assuming the data is an array, update the state with the response data
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, [student]);
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Edit Student
            </h2>
            <p className="mt-2 text-base text-gray-600"></p>
            <form action="#" method="POST" className="mt-8" onSubmit={submit}>
              <div className="space-y-5">
                <div>
                  <label
                    for="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="name"
                      id="name"
                      placeholder={student?.studentName}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="class"
                    className="text-base font-medium text-gray-900"
                  >
                    Class
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      name="class"
                      id="class"
                      placeholder={student?.class}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      for="roll"
                      className="text-base font-medium text-gray-900"
                    >
                      Roll
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="number"
                      name="roll"
                      id="roll"
                      placeholder={student?.roll}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Edit student
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default UpdateStudent;
