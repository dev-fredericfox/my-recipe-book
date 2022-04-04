export async function revalidateNow(path:string) {
  const fetchUrl = `${process.env.HOSTNAME}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}`;
  try {
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({pathToRevalidate: path})
    });
    return response
  } catch (error:any) {
      console.log(error)
      return error.message
  }
}
