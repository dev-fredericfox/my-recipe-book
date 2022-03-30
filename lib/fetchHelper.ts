import { Post } from "../lib/interfaces";

export async function saveToDB(method: string, id?: number, payload?: Post) {
  console.log("clicked submitted");
  try {
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
    let response = await fetch(fetchUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    if (response.status === 403) {
      throw Error("You need to be logged in to post a new recipe.");
    }
    if (response.status === 500) {
      throw Error("Database Error");
    }
    if (response.status === 200) {
      return result;
    } else {
      throw Error("Something went wrong");
    }
  } catch (error: any) {
    throw Error("Something went wrong");
  }
}
