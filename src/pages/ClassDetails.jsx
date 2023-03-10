import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DependentReq from "../components/DependentReq.jsx";

const ClassDetails = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/classes/" + id)
      .then((response) => {
        if (!response.ok) {
          throw Error("Vi kunne desværre ikke indlæse kursusinformationerne");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setClassDetail(data);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [setClassDetail, setIsLoading, setError, id]);

  console.log("classDetail", classDetail);
  console.log("trainerId", classDetail?.trainerId);

  return (
    <div>
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
    </div>
  );
};

export default ClassDetails;

// <DependentReq trainerId={classDetail.trainerId} />
