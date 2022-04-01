import { Post } from "../lib/interfaces";
import { revalidateNow } from "./revalidateHelper";

export async function saveToDB(method: string, id?: number, payload?: any) {
  console.log("clicked submitted");
  let fetchUrl = "/api/";
  let body = payload ?? "";

  if (method === "POST") {
    fetchUrl = `/api/post`;
  }
  if (method === "DELETE") {
    fetchUrl = `/api/delete/${id}`;
  }
  if (method === "PUT") {
    fetchUrl = `/api/update/${id}`;
  }
  try {
    let response = await fetch(fetchUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    if (response.status === 403) {
      throw Error("You need to be logged in to post a new recipe.");
    } else if (response.status === 500) {
      throw Error("Database Error");
    } else if (response.status === 200) {
      let revalidation = await revalidateNow()
      return result;
    } else {
      throw Error("Something went wrong");
    }
  } catch (error: any) {
    throw Error(error);
  }
}
