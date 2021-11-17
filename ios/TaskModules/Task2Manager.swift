//
//  Task2Manager.swift
//  RNReaminated
//
//  Created by Nguyen Van Hung on 11/17/21.
//

import Foundation

@objc(Task2Manager)
class Task2Manager: NSObject {
  
  @objc(doTaskX:effort:) // thêm anotaion này để convert sang objective-C vì RN hiểu mỗi Objective-C
  func doTaskX(name: String, effort: NSNumber) -> Void {
    print("doTaskX with name: \(name), effort: \(effort)");
  }
  
  @objc(getAllTask2:callback:)
  func getAllTask2(params: [String: Any], callback: RCTResponseSenderBlock)  {
    let tasks = [
      ["name": "Buy a new phone", "status": true],
      ["name": "Buy a new car", "status": false],
    ]
    if tasks.count > 0 {
      callback([NSNull(), tasks]);
    }else {
      callback(["Cannot find tasks", []]);
    }
  }
  
  @objc(getSomeTasks2:resolver:rejecter:)
  func getSomeTasks2(parmas: String, resolver: RCTPromiseResolveBlock, rejecter: RCTPromiseRejectBlock) {
    let tasks = [
      ["name": "Buy a new phone", "status": true],
      ["name": "Buy a new car", "status": false],
    ]
    if parmas == "all" {
      resolver(tasks)
    }else {
      rejecter("500", "Internal error occur", "Internal Error" as? Error);
    }
  }
}

