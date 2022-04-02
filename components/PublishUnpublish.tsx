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
