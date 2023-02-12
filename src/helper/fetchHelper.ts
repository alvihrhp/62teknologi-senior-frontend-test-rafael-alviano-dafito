const proxyURL: string = process.env.REACT_APP_PROXY_URl
  ? process.env.REACT_APP_PROXY_URl
  : "";
const baseURL: string = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : "";

const apiKey: string = process.env.REACT_APP_API_KEY
  ? process.env.REACT_APP_API_KEY
  : "";

async function fetchHeler(
  url: string,
  method: string,
  data?: { [key: string]: any }
): Promise<any> {
  try {
    const res = await fetch(`${proxyURL}${baseURL}${url}`, {
      method,
      headers: {
        Authorization: `Bearer 32143124`,
        Cookie: '__cfduid=db290300ecfe95ec1fe3bc92c388c3c991586618117"',
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await res.json();

    if (data.error) {
      const { error } = data;
      throw new Error(error.code);
    }

    return res;
  } catch (error) {
    throw error;
  }
}

export default fetchHeler;
