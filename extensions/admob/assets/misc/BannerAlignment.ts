
/**
 * @en
 * Defines the RelativeLayout of Android in Typescript. 
 * See RelativeLayout.java for more details. 
 */
export enum BannerAlignment {
    /**
    * Rule that aligns a child's left edge with another child's left edge.
    */
    ALIGN_LEFT = "ALIGN_LEFT",
    /**
     * Rule that aligns a child's top edge with another child's top edge.
     */
    ALIGN_TOP = "ALIGN_TOP",
    /**
     * Rule that aligns a child's right edge with another child's right edge.
     */
    ALIGN_RIGHT = "ALIGN_RIGHT",
    /**
     * Rule that aligns a child's bottom edge with another child's bottom edge.
     */
    ALIGN_BOTTOM = "ALIGN_BOTTOM",
    /** 
     * Rule that centers the child horizontally with respect to the
     * bounds of its RelativeLayout parent.
     */
    CENTER_HORIZONTAL = "CENTER_HORIZONTAL",
    /**
     * Rule that centers the child vertically with respect to the
     * bounds of its RelativeLayout parent.
     */
    CENTER_VERTICAL = "CENTER_VERTICAL",
}

/**
 * @en
 * Put the banner at bottom-center of the screen
 */
export const BottomCenter = [BannerAlignment.ALIGN_BOTTOM, BannerAlignment.CENTER_HORIZONTAL];

/**
 * @en
 * Put the banner at the top-center of the screen.
 */
export const TopCenter = [BannerAlignment.ALIGN_TOP, BannerAlignment.CENTER_HORIZONTAL];