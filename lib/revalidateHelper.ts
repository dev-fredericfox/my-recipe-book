export async function revalidateNow() {
  const fetchUrl = `${process.env.HOSTNAME}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
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
