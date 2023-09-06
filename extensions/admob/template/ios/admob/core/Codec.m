/****************************************************************************
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos.com
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You
 shall not use Cocos Creator software for developing other software or tools
 that's used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.
 
 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to
 you.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "Codec.h"

#import <objc/runtime.h>

@interface Codec ()

@property (nonatomic, strong) NSMutableDictionary<NSString *, Class> *registerMap;

@end

@implementation Codec

- (instancetype)init {
    self = [super init];
    if (self) {
        _registerMap = [NSMutableDictionary dictionary];
    }
    return self;
}

- (void)registerMethod:(NSString *)method type:(Class)type {
    [self.registerMap setObject:type forKey:method];
}

- (id)decode:(NSString *)method data:(NSString *)data {
    Class classType = [self.registerMap objectForKey:method];
    if (classType) {
        NSData *jsonData = [data dataUsingEncoding:NSUTF8StringEncoding];
        NSError *error = nil;
        NSDictionary *jsonDict = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:&error];
        if (error) {
            NSLog(@"JSON parsing error: %@", error);
            return nil;
        }
        id decodedObject = [classType new];
        for (NSString *key in jsonDict.allKeys) {
            if ([decodedObject respondsToSelector:NSSelectorFromString(key)]) {
                [decodedObject setValue:jsonDict[key] forKey:key];
            }
        }        
        return decodedObject;
    }
    return nil;
}

- (NSMutableDictionary *)objectToDictionary:(id)object {
    NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
    
    Class currentClass = [object class];
    while (currentClass != [NSObject class]) {
        unsigned int propertyCount;
        objc_property_t *properties = class_copyPropertyList(currentClass, &propertyCount);
        
        for (unsigned int i = 0; i < propertyCount; i++) {
            objc_property_t property = properties[i];
            const char *propertyName = property_getName(property);
            NSString *key = [NSString stringWithUTF8String:propertyName];
            if (![key isEqualToString:@"hash"] && ![key isEqualToString:@"description"] && ![key isEqualToString:@"superclass"] && ![key isEqualToString:@"debugDescription"]) {
                id value = [object valueForKey:key];
                
                if (value) {
                    [dictionary setObject:value forKey:key];
                }
            }
        }
        
        free(properties);
        
        currentClass = class_getSuperclass(currentClass);
    }
    return dictionary;
}

- (NSString *)encode:(id)src {
    NSDictionary *dic = [self objectToDictionary:src];
    NSError *error = nil;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
    if (!jsonData) {
        NSLog(@"JSON serialization error: %@", error);
        return nil;
    } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        NSLog(@"JSON String: %@", jsonString);
        return jsonString;
    }
}

@end
