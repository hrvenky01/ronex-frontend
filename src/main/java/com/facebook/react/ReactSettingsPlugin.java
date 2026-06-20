package com.facebook.react;

import org.gradle.api.Plugin;
import org.gradle.api.initialization.Settings;

public class ReactSettingsPlugin implements Plugin<Settings> {
    @Override
    public void apply(Settings settings) {
        // No-op plugin (required for RN 0.85.x)
    }
}