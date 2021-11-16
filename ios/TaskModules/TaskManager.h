//
//  TaskManager.h
//  RNReaminated
//
//  Created by Nguyen Van Hung on 11/16/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h> // module cầu nối native với js
#import <React/RCTEventEmitter.h> // module send events from Native to React Native

NS_ASSUME_NONNULL_BEGIN

@interface TaskManager : RCTEventEmitter<RCTBridgeModule>
@end

NS_ASSUME_NONNULL_END
