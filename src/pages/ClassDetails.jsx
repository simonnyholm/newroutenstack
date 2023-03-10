import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DependentReq from "../components/DependentReq.jsx";
import axios from "axios";

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/classes/" + id
        );
        console.log(response);
        if (response.status === 200) {
          setClassDetail(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setClassDetail, setIsLoading, setError, id]);

  console.log("classDetail", classDetail);
  console.log("trainerId", classDetail?.trainerId);

  return (
    <>
      {isLoading && (
        <section>
          <article>
            <h1>...Loading</h1>
          </article>
        </section>
      )}
      {classDetail && (
        <>
          <section>
            <article>
              <h1>{classDetail.className}</h1>
              <p>{classDetail.classDescription}</p>
            </article>
          </section>
        </>
      )}
      {classDetail?.trainerId && (
        <section>
          <DependentReq trainerId={classDetail?.trainerId} />
        </section>
      )}
      {error && (
        <section>
          <article>
            <h1>Fejl</h1>
            <p>{error}</p>
          </article>
        </section>
      )}
    </>
  );
};

export default ClassDetails;

// <DependentReq trainerId={classDetail.trainerId} />
