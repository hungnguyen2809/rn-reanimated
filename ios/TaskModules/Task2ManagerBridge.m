//
//  Task2ManagerBridge.m
//  RNReaminated
//
//  Created by Nguyen Van Hung on 11/17/21.
//
//file này dùng để chuyển, địch nghĩa các method cho native modules
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Task2Manager, NSObject)
  RCT_EXTERN_METHOD(doTaskX: (NSString *)name effort:(nonnull NSNumber *) effort)

  RCT_EXTERN_METHOD(getAllTask2: (NSDictionary*) params callback:(RCTResponseSenderBlock)callback)

  RCT_EXTERN_METHOD(getSomeTasks2: (NSString *)params
                    resolver: (RCTPromiseResolveBlock)resolve
                    rejecter: (RCTPromiseRejectBlock)reject)
@end
