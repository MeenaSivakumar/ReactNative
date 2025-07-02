package com.awesomeproject

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments

class IntentLauncherModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "IntentLauncher"

    @ReactMethod
    fun getInitialIntent(promise: Promise) {
        try {
            val currentActivity = currentActivity
            if (currentActivity != null) {
                val intent = currentActivity.intent
                val screen = intent.getStringExtra("screen")

                val result = Arguments.createMap()
                result.putString("screen", screen)
                promise.resolve(result)
            } else {
                promise.reject("NO_ACTIVITY", "Current activity is null")
            }
        } catch (e: Exception) {
            promise.reject("INTENT_ERROR", "Error reading intent: ${e.message}", e)
        }
    }
}
