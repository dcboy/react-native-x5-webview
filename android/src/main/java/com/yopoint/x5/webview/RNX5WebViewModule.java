
package com.yopoint.x5.webview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.tencent.smtt.sdk.WebView;

public class RNX5WebViewModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext mReactContext;

  public RNX5WebViewModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.mReactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNX5WebView";
  }

  @ReactMethod
  public void getX5CoreVersion(Callback callback) {
    callback.invoke(WebView.getTbsCoreVersion(mReactContext));
  }
}