package com.nourishai;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Pair;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

public class MobileNetModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private MobileNet mobileNet;

    MobileNetModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        mobileNet = new MobileNet(context);
    }

    @Override
    public String getName() {
        return "MobileNetModule";
    }

    @ReactMethod
    public void predict(String imagePath, Promise promise) {
        try {
            Bitmap bitmap = BitmapFactory.decodeFile(imagePath);
            Pair<String, Float> result = mobileNet.predict(bitmap);

            WritableMap predictionMap = Arguments.createMap();
            predictionMap.putString("label", result.first);
            predictionMap.putDouble("confidence", result.second);

            promise.resolve(predictionMap);
        } catch (Exception e) {
            promise.reject("PREDICTION_ERROR", e);
        }
    }

    @ReactMethod
    public void closeModel() {
        mobileNet.closeModel();
    }
}