package com.rnreaminated.BlueModule;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.os.Build;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;


public class BlueModule extends ReactContextBaseJavaModule {
    private BluetoothAdapter bluetoothAdapter = null;

    public BlueModule (ReactApplicationContext context){
        super(context);

        setUpModule();
    }


    public String getName() {
        return "BlueModule";
    }

    public void setUpModule() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            BluetoothManager bluetoothManager = getReactApplicationContext().getSystemService(BluetoothManager.class);
            bluetoothAdapter = bluetoothManager.getAdapter();
        }
    }

    @ReactMethod
    public void isEnabled(Callback callback){
        WritableMap writableMap = Arguments.createMap();
        if (bluetoothAdapter == null){
            writableMap.putString("message", "Device doesn't support Bluetooth");
            writableMap.putBoolean("status", false);
            callback.invoke(writableMap);
        }else {
            if (bluetoothAdapter.isEnabled()){
                writableMap.putString("message", "Bluetooth is on");
                writableMap.putBoolean("status", true);
            }else {
                writableMap.putString("message", "Bluetooth is off");
                writableMap.putBoolean("status", false);
            }
        }

    }

}
