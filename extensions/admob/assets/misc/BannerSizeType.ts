/**
 * @zh
 * Banner 的大小类型 
 * @en
 * Banner Size Type 
 */
export enum BannerSizeType {
    /**
     * @zh
     * Builtin 表示是 BannerSize 这个类中的默认类型
     * @en
     * Builtin Banner size defined in {BannerSize}
     */
    Builtin = "Builtin",

    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getLandscapeAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getLandscapeAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Landscape = "Landscape",

    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getPortraitAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getPortraitAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Portrait = "Portrait",
    
    /**
     * @zh
     * 自适应 Banner，请参考 ：
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * 使用 AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize 来设置 Banner 的大小
     * @en
     * Anchored adaptive banners. Please refer to 
     * https://developers.google.com/admob/android/banner/anchored-adaptive
     * Use AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize to create the Banner Size.
     */
    Current = "Current",
}