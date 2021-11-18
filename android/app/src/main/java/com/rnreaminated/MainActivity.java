package com.rnreaminated;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.rnreaminated.ToastModule.ToastEvent;

public class MainActivity extends ReactActivity {
  public static ToastEvent toastEvent = null;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (toastEvent == null){
      toastEvent = new ToastEvent(getReactInstanceManager());
    }


  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNReaminated";
  }
}
