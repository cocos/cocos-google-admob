/**
 * @en
 * Load Ad Error return by Google mobile ad SDK 
 */
export type LoadAdError = string;

/**
 * @en
 * AdError return by Googl Mobile Ad SDK
 * {
    "Code": 2,
    "Message": "Network error.",
    "Domain": "com.google.android.gms.ads",
    "Cause": "null",
    "Response Info": {
      "Response ID": "null",
      "Mediation Adapter Class Name": "",
      "Adapter Responses": [],
      "Response Extras": {}
    }
  }
 */
export type AdError = string;