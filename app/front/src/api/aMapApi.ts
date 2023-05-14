import { aMapToken } from "../config/token";

const aMapWeatherApi = async (
  cid = "320100",
  extensions: "base" | "all" = "base"
): Promise<{ lives: Array<{ weather: string }> }> => {
  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/weather/weatherInfo?key=${aMapToken.web}&city=${cid}&extensions=${extensions}`,
      { method: "GET" }
    );
    return await response.json();
  } catch (reason) {
    throw `高德天气 API 获取失败: ${reason}`;
  }
};

export default aMapWeatherApi;
