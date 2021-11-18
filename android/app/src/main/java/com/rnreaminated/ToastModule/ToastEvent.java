package com.rnreaminated.ToastModule;

import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ToastEvent  {
    private final ReactInstanceManager manager;

    public ToastEvent(ReactInstanceManager manager){
        this.manager = manager;
    }

    public void sendEventNative(){
        WritableMap data = Arguments.createMap(); //key - value
        data.putString("name", "Hùng");
        data.putInt("age", 22);
        data.putString("email", "hung@gmail.com");

        Log.d("SEND_EVENT", "Đã chạy vào đây rồi mà không gửi data đi");
        manager.getCurrentReactContext().
                getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("EventToastA", data);
    }
}
