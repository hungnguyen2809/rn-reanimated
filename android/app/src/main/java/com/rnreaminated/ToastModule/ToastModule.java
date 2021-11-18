package com.rnreaminated.ToastModule;

import android.os.CountDownTimer;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class ToastModule extends ReactContextBaseJavaModule {
    private final String MODULE_NAME = "ToastModule";
    private final String LENGTH_SHORT = "LENGTH_SHORT";
    private final String LENGTH_LONG = "LENGTH_LONG";

//    private DeviceEventManagerModule.RCTDeviceEventEmitter deviceEventEmitter = null;

    public ToastModule(ReactApplicationContext context){
        super(context);
    }

//    public void SendEvent(String eventName, WritableMap data){
//        if (deviceEventEmitter == null){
//            deviceEventEmitter = getReactApplicationContext()
//                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
//        }
//        if (deviceEventEmitter != null){
//            deviceEventEmitter.emit(eventName, data);
//        }
//    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        // dùng để đưa các thuộc tính ra ngoài
        final Map<String, Object> constants = new HashMap<>();
        constants.put("PI", 3.1416529);
        constants.put(LENGTH_SHORT, Toast.LENGTH_SHORT);
        constants.put(LENGTH_LONG, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod //thêm anotaion này để biết đây là hàm sẽ sử dụng ở bên RN
    public void showText(String message, int duration){
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    // Write a callback function
    @ReactMethod
    public void doTaskCallback(int aNumber, Callback callbackS, Callback callbackE){
        try{
            // Error
             if (aNumber == 100){
                 throw new Exception("Input number is 100, cannot do this task");
             }
             //Success
             String name = "Hùng";
             int age = 22;
             String address = "Bắc Giang";
             callbackS.invoke(name, address, age); //invoke is execute
        }catch (Exception e){
            callbackE.invoke(e.getMessage());
        }
    }

    // Write a Promise
    @ReactMethod
    public void doTaskPromise(int aNumber, Promise promise){
        try
        {
            // Error
            if (aNumber == 100){
                throw new Exception("Input number is 100, cannot do this task");
            }
            // Success
            WritableMap writableMap = Arguments.createMap(); //key - value
            writableMap.putString("name", "Hùng");
            writableMap.putInt("age", 22);
            writableMap.putString("email", "hung@gmail.com");

            promise.resolve(writableMap);
        }catch (Exception e){
            promise.reject(e);
        }
    }

//    @ReactMethod
//    public void sendEventNative(){
//        Log.d("AAAAA", "BBBB");
//        CountDownTimer countDownTimer = new CountDownTimer(5000, 1000) {
//            @Override
//            public void onTick(long millisUntilFinished) {
//            }
//
//            @Override
//            public void onFinish() {
//                WritableMap writableMap = Arguments.createMap();
//                writableMap.putString("name", "Hùng");
//                writableMap.putInt("age", 22);
//                writableMap.putString("email", "hung@gmail.com");
//
//                SendEvent("SendEvent", writableMap);
//            }
//        };
//        countDownTimer.start();
//    }

}
