import useAxios from "../hooks/useAxios";

const DependentReq = ({ trainerId }) => {
  console.log("dep", trainerId);
  const { data, loading, error } = useAxios({
    url: "http://localhost:4000/api/v1/trainers/" + trainerId,
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  return (
    <>
      {loading && <p>...loading</p>}
      {data && <p>{data?.trainerName}</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default DependentReq;
