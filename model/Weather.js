class Weather {
  constructor(
    latitude = 0,
    longitude = 0,
    cityName,
    baseUrl,
    unitsSystem,
    apikey
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.cityName = cityName;
    this.baseUrl = baseUrl;
    this.unitsSystem = unitsSystem;
    this.apikey = apikey;
  }
  getUrl() {
    if (this.latitude && this.longtitude) {
      return `${this.baseUrl}lat=${this.latitude}&lon=${this.longitude}&units=${this.unitsSystem}&appid=${this.apikey}`;
    } else {
      return `${this.baseUrl}q=${this.cityName}&units=${this.unitsSystem}&appid=${this.apikey}`;
    }
  }
}

export default Weather;

