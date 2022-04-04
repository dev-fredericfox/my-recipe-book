import { useState } from "react";
import { saveToDB } from "../lib/fetchHelper";
import Alert from "../components/Alert";
import InProgress from "../components/InProgressIndicator"

interface Props {
  status: boolean;
  id: number;
}

export default function PublishUnpublish({ status, id }: Props) {
  const [localStatus, setLocalStatus] = useState(status);
  const [inProgress, setInProgress] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [fetchResult, setFetchResult] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  const submitData = async (published: boolean, postId: number) => {
    setInProgress(true);
    const body = {
      published: !published,
    };
    try {
      const result = await saveToDB("PUT", postId, body);
      setFetchResult(result);
      setFetchStatus("OK");
      setLocalStatus(!localStatus);
      setInProgress(false);
    } catch (error: any) {
      setFetchResult("Failed");
      setShowAlert(true);
      setFetchError(error.message);
      setInProgress(false);
    }
  };

  const hideAlert = (): void => {
    setShowAlert(false);
    setFetchResult("");
  };

  return (
    <div>
      {showAlert && <Alert message={fetchError} hideAlert={hideAlert} />}
      {localStatus && !inProgress && (
        <div
          className="cursor-pointer text-2xl mr-3 my-0"
          onClick={() => submitData(localStatus, id)}
        >
          ■
        </div>
      )}
      {inProgress && <InProgress color="orange" />}
      {!localStatus && !inProgress && (
        <div
          className="cursor-pointer text-2xl mr-3 my-0"
          onClick={() => submitData(localStatus, id)}
        >
          ▶
        </div>
      )}
    </div>
  );
}
