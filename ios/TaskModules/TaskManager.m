//
//  TaskManager.m
//  RNReaminated
//
//  Created by Nguyen Van Hung on 11/16/21.
//

#import "TaskManager.h"
#import <React/RCTLog.h> // thư viện để log với React

@implementation TaskManager
//constructor as "Singleton pattarn" = 1 class TaskManager => 1 object TaskManager
+ (id)allocWithZone:(struct _NSZone *)zone{
  static TaskManager *shared = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{shared = [super allocWithZone:zone]; });
  return shared;
}

//RCT_EXPORT_MODULE: đặt tên cho module's bỏ trống mặc định lấy tên 'TaskManager'
RCT_EXPORT_MODULE();

// RCT_EXPORT_METHOD đưa một method ra bên ngoài sử dụng
RCT_EXPORT_METHOD(doTaskInfo: (NSString *) taskName effort:(int)effort)
{
  //method has name doTaskInfo with 2 paramaster taskName anh effort
  RCTLogInfo(@"Do task with name: %@, effort: %d", taskName, effort);
}

// function with NSDictionary params
RCT_EXPORT_METHOD(doTaskParams: (NSString *) taskName params: (NSDictionary *)params){
//  NSDictionary (IOS) = object (JavaScript)
  RCTLogInfo(@"Do task with params: %@", params);
}

//Function which return value => allaway use callback!
RCT_EXPORT_METHOD(getAllTask: (RCTResponseSenderBlock) callback ){
  NSArray *tasks = @[
    @{@"name": @"By a new car", @"status": @false},
    @{@"name": @"By a new smartphone", @"status": @true}
  ];
  if (tasks.count > 0) {
    callback(@[[NSNull null], tasks]);
  } else {
    callback(@[@"Cannot find tasks", [NSNull null]]);
  }
}

//Funtion which return value => use Promise
RCT_REMAP_METHOD(getSomeTasks, params:(NSString *)params
                  resolver: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  //getSomeTasks tên hàm; params tham số truyền vào (string); resolver, rejecter khối giải quyết
  NSArray *tasks = @[
    @{@"name": @"By a new house", @"status": @false},
    @{@"name": @"Learn Native Modules", @"status": @true}
  ];
  if ([params isEqualToString:@"all"]) { // fake rule
    // success
    resolve(tasks);
  } else {
    // falied
    NSString *code = @"500";
    NSString *message = @"Cannot get some tasks";
    NSError *error = [NSError errorWithDomain:@"Internal Error" code:500 userInfo:@{NSLocalizedDescriptionKey: @"Some thing wrong with task !"}];
    reject(code, message, error);
  }
}

//Send events from Objective-C to React Native
// khi mà Objective-C hoàn thành 1 công việc nào nó và muốn gửi lại cho RN

//supportedEvents ghi đè lại và đăng ký 2 event với name là EventA và EventB (có thể thêm nhiều event)
- (NSArray<NSString *> *)supportedEvents {
  return @[@"EventA", @"EventB"];
}
@end
