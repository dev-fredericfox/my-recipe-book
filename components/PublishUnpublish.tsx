import { useState } from "react";
import { saveToDB } from "../lib/fetchHelper";
import Alert from "../components/Alert";

interface Props {
  status: boolean;
  id: number;
}

export default function PublishUnpublish({ status, id }: Props) {
  const [localStatus, setLocalStatus] = useState(status);
  const [fetchError, setFetchError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [fetchResult, setFetchResult] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  // const submitData = async (published: boolean, id: number) => {
  //   console.log("clicked submitted");
  //   const body = {
  //     published: !published,
  //   };
  //   console.log(body);
  //   setFetchStatus("pending");
  //   try {
  //     let response = await fetch(`/api/update/${id}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     let result = await response.json();
  //     if (response.status === 403) {
  //       throw Error("You need to be logged in to post a new recipe.");
  //     }
  //     if (response.status === 500) {
  //       throw Error("Database Error");
  //     }
  //     if (response.status === 200) {
  //       setFetchResult(result);
  //       setFetchStatus("OK");
  //       setLocalStatus(!localStatus)
  //       console.log(fetchResult);
  //     } else {
  //       throw Error("Something went wrong");
  //     }
  //   } catch (error: any) {
  //     setFetchError(error.message);
  //     setFetchStatus("Error");
  //     console.error(error);
  //   }
  // };

  const submitData = async (published: boolean, postId:number) => {
    const body = {
      published: !published,
    };
    try {
      const result = await saveToDB("PUT", postId, body);
      setFetchResult(result);
      setFetchStatus("OK");
      setLocalStatus(!localStatus)
    } catch (error: any) {
      setFetchResult("Failed");
      setShowAlert(true);
      console.log("error.message");
      setFetchError(error.message);
    }
  };

  const hideAlert = ():void => {
    setShowAlert(false);
    setFetchResult("")
  };

  return (
    <div>
      {showAlert && <Alert message={fetchError} hideAlert={hideAlert} />}
      {localStatus && <div onClick={() => submitData(localStatus, id)}>■</div>}
      {!localStatus && <div onClick={() => submitData(localStatus, id)}>▶</div>}
    </div>
  );
}
