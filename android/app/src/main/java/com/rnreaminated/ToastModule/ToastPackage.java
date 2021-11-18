package com.rnreaminated.ToastModule;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ToastPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        //createNativeModules dùng để đưa các module sang
        // Add ToastModule to this List
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new ToastModule(reactContext));
        return nativeModules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        //createViewManagers dùng để đưa các View module sang
        return Collections.emptyList();
    }
}
