import { env } from "process";

export async function revalidateNow() {
  const fetchUrl = `${env.HOSTNAME}/api/revalidate?secret=${env.REVALIDATE_SECRET}`;
  console.log(fetchUrl);
  try {
    let response = await fetch(fetchUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response
  } catch (error:any) {
      console.log(error)
      return error.message
  }
}
