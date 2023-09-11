# Supported for Cocos Service!

if(EXISTS ${RES_DIR}/proj/admob)
    list(APPEND CC_UI_RESOURCES
        ${RES_DIR}/proj/admob/nativetemplates/GADTFullScreenTemplateView.xib
        ${RES_DIR}/proj/admob/nativetemplates/GADTMediumTemplateView.xib
        ${RES_DIR}/proj/admob/nativetemplates/GADTSmallTemplateView.xib
    )
    list(APPEND CC_ALL_SOURCES ${CC_UI_RESOURCES})
endif()