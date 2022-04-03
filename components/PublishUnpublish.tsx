import { useState } from "react";
import { saveToDB } from "../lib/fetchHelper";
import Alert from "../components/Alert";

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
    setInProgress(true)
    const body = {
      published: !published,
    };
    try {
      const result = await saveToDB("PUT", postId, body);
      setFetchResult(result);
      setFetchStatus("OK");
      setLocalStatus(!localStatus);
      setInProgress(false)
    } catch (error: any) {
      setFetchResult("Failed");
      setShowAlert(true);
      setFetchError(error.message);
      setInProgress(false)
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
      {inProgress && (
      <span className="flex h-3 w-3 mr-4 mt-3 cursor-wait">
            <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
          </span>
      )}
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
