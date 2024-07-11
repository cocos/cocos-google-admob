
set(ADMOB_PROJ_SOURCES)

list(APPEND ADMOB_PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/AdServiceHub.m
    ${CMAKE_CURRENT_LIST_DIR}/AdServiceHub.h
)

file(GLOB_RECURSE OTHER_FILES LIST_DIRECTORIES false
    "${CMAKE_CURRENT_LIST_DIR}/core/*.h"
    "${CMAKE_CURRENT_LIST_DIR}/core/*.m"
    "${CMAKE_CURRENT_LIST_DIR}/core/*.mm"
    "${CMAKE_CURRENT_LIST_DIR}/proto/*.h"
    "${CMAKE_CURRENT_LIST_DIR}/proto/*.m"
    "${CMAKE_CURRENT_LIST_DIR}/service/*.h"
    "${CMAKE_CURRENT_LIST_DIR}/service/*.m"
    "${CMAKE_CURRENT_LIST_DIR}/nativetemplates/*.h"
    "${CMAKE_CURRENT_LIST_DIR}/nativetemplates/*.m"
)
list(APPEND ADMOB_PROJ_SOURCES ${OTHER_FILES})

source_group(TREE ${CMAKE_CURRENT_LIST_DIR} PREFIX "Source Files" FILES ${ADMOB_PROJ_SOURCES})

foreach(file ${ADMOB_PROJ_SOURCES})
    get_filename_component(file_directory ${file} DIRECTORY)
    set_source_files_properties(${file} PROPERTIES COMPILE_OPTIONS "-fobjc-arc")
endforeach()

add_library(admob ${ADMOB_PROJ_SOURCES})

target_include_directories(admob PRIVATE 
    "${CMAKE_CURRENT_LIST_DIR}/proto"
    "${CMAKE_CURRENT_LIST_DIR}/proto/appopen"
    "${CMAKE_CURRENT_LIST_DIR}/proto/banner"
    "${CMAKE_CURRENT_LIST_DIR}/proto/interstitial"
    "${CMAKE_CURRENT_LIST_DIR}/proto/nativead"
    "${CMAKE_CURRENT_LIST_DIR}/proto/rewarded"
    "${CMAKE_CURRENT_LIST_DIR}/proto/rewarded-interstitial"
    "${CMAKE_CURRENT_LIST_DIR}/core"
    "${CMAKE_CURRENT_LIST_DIR}/nativetemplates"
)

# google admob sdk 引入
set(GOOGLE_MOBILE_ADS_SDK_VERSION "11.2.0")
set(GOOGLE_ADMOB_XCFRAMEWORKS_DIR "${CMAKE_CURRENT_LIST_DIR}/GoogleMobileAdsSdkiOS-${GOOGLE_MOBILE_ADS_SDK_VERSION}")

file(GLOB GOOGLE_ADMOB_XCFRAMEWORK_FILES "${GOOGLE_ADMOB_XCFRAMEWORKS_DIR}/*.xcframework")

set(TARGET_ARCHITECTURES arm64)

foreach(XCFRAMEWORK_FILE ${GOOGLE_ADMOB_XCFRAMEWORK_FILES})
    get_filename_component(XCFRAMEWORK_PATH ${XCFRAMEWORK_FILE} ABSOLUTE)
   
    # 查找并引用库
    foreach(ARCHITECTURE ${TARGET_ARCHITECTURES})
        file(GLOB LIBRARY "${XCFRAMEWORK_PATH}/ios-${ARCHITECTURE}/*.framework")
        get_filename_component(LIB_NAME ${LIBRARY} NAME_WE)
        
        find_library(MYLIBRARY_${LIB_NAME}_${ARCHITECTURE} ${LIB_NAME}
            PATHS "${XCFRAMEWORK_PATH}/ios-${ARCHITECTURE}"
            NO_DEFAULT_PATH
            NO_CMAKE_FIND_ROOT_PATH
        )
        
        if(MYLIBRARY_${LIB_NAME}_${ARCHITECTURE} STREQUAL "MYLIBRARY_${LIB_NAME}_${ARCHITECTURE}-NOTFOUND")
            message("${LIB_NAME} Library not found")
        else()
            string(REPLACE "${ARCHITECTURE}" "\${CURRENT_ARCH}" updated_path "${MYLIBRARY_${LIB_NAME}_${ARCHITECTURE}}")
            target_link_libraries(admob ${updated_path})
            message("${LIB_NAME}-${ARCHITECTURE} Library link success")
        endif()
    endforeach()
endforeach()

target_link_options(admob PRIVATE -ObjC)
target_link_options(${EXECUTABLE_NAME} PRIVATE -ObjC)

# set_target_properties(admob PROPERTIES RESOURCE "${ADMOB_RESOURCES}")

target_link_libraries(admob ${ENGINE_NAME})
target_include_directories(${EXECUTABLE_NAME} PUBLIC ${CMAKE_CURRENT_LIST_DIR})

target_link_libraries(${EXECUTABLE_NAME} admob)
# 从新指定引擎的 INFO.plist 路径 ，该 plist 文件融合了引擎和 admob 的需要的处理
set_target_properties(${EXECUTABLE_NAME} PROPERTIES
    MACOSX_BUNDLE_INFO_PLIST "${CMAKE_CURRENT_LIST_DIR}/Info.plist"
)
