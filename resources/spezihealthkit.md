Directory structure:
└── stanfordspezi-spezihealthkit/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziHealthKit/
        │   └── SpeziHealthKit.docc/
        │       ├── ModuleConfiguration.md
        │       ├── SampleType+CategoryTypes.md
        │       ├── SampleType+QuantityTypes.md
        │       ├── SampleType.md
        │       └── SpeziHealthKit.md
        └── SpeziHealthKitUI/
            └── SpeziHealthKitUI.docc/
                ├── HealthChart.md
                └── SpeziHealthKitUI.md

================================================
File: README.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

# Spezi HealthKit

[![Build and Test](https://github.com/StanfordSpezi/SpeziHealthKit/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziHealthKit/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziHealthKit/branch/main/graph/badge.svg?token=GSed8tVeou)](https://codecov.io/gh/StanfordSpezi/SpeziHealthKit)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7824636.svg)](https://doi.org/10.5281/zenodo.7824636)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziHealthKit%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziHealthKit%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit)

Access Health data in your Spezi app.

## Overview

The Spezi HealthKit module enables apps to integrate with Apple's HealthKit system, fetch data, set up long-lived background data collection, and visualize Health-related data.

### Setup

You need to add the Spezi HealthKit Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.


### Health Data Collection

Before you configure the [`HealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkit-swift.class)  module, make sure your `Standard` in your Spezi Application conforms to the [`HealthKitConstraint`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint) protocol to receive HealthKit data.
The [`HealthKitConstraint/add(sample:)`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint/add(sample:)) function is called once for every newly collected HealthKit sample, and the [`HealthKitConstraint/remove(sample:)`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint/remove(sample:)) function is called once for every deleted HealthKit sample.
```swift
actor ExampleStandard: Standard, HealthKitConstraint {
    // Add the newly collected HKSample to your application.
    func add(sample: HKSample) async {
        // ...
    }

    // Remove the deleted HKSample from your application.
    func remove(sample: HKDeletedObject) {
        // ...
    }
}
```


Then, you can configure the [`HealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkit-swift.class) module in the configuration section of your `SpeziAppDelegate`.
You can, e.g., use [`CollectSample`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/collectsample) to collect a wide variety of HealthKit data types:
```swift
class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: ExampleStandard()) {
            HealthKit {
                CollectSample(.activeEnergyBurned)
                CollectSample(.stepCount, start: .manual)
                CollectSample(.pushCount, start: .manual)
                CollectSample(.heartRate, continueInBackground: true)
                CollectSample(.electrocardiogram, start: .manual)
                RequestReadAccess(quantity: [.bloodOxygen])
            }
        }
    }
}
```

> [!TIP]
> See [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) for a complete list of supported sample types.


### Querying Health Data in SwiftUI

You can use [`SpeziHealthKitUI`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui)'s [`HealthKitQuery`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthkitquery) and [`HealthKitStatisticsQuery`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthkitstatisticsquery) property wrappers to access the Health database in a View:
```swift
struct ExampleView: View {
    @HealthKitQuery(.heartRate, timeRange: .today)
    private var heartRateSamples

    var body: some View {
        ForEach(heartRateSamples) { sample in
            // ...
        }
    }
}
```

Additionally, you can use [`SpeziHealthKitUI`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui)'s [`HealthChart`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthchart) to visualise query results:
```swift
struct ExampleView: View {
    @HealthKitQuery(.heartRate, timeRange: .today)
    private var heartRateSamples

    var body: some View {
        HealthChart {
            HealthChartEntry($heartRateSamples, drawingConfig: .init(mode: .line, color: .red))
        }
    }
}
```


For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit/documentation).

## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the [`SpeziHealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit) module.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziHealthKit/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)


================================================
File: CONTRIBUTORS.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

SpeziHealthKit contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)
* [Lukas Kollmer](https://github.com/lukaskollmer)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


================================================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/ModuleConfiguration.md
================================================
# HealthKit Module Configuration

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Configure Spezi's HealthKit module to work with your app

## Configuration Components

Your app uses ``HealthKitConfigurationComponent``s to configure the ``HealthKit-swift.class`` module for use in your app.
Each configuration component defines which HealthKit data types it needs access to, and is given the opportunity to register additional
Configuration components are processed in the order in which they are defined.

There are several built-in configuration components you can use in your app:
- ``CollectSample``: Set up background delivery of HealthKit samples to your app's `Standard`
- ``RequestReadAccess``: Define which HealthKit sample types your app requires read-access to
- ``RequestWriteAccess``: Define which HealthKit sample types your app requires write-access to

In addition to these, you can use the ``HealthKitConfigurationComponent`` protocol to define your own components and integrate then with the `HealthKit` module.


### Example
This example uses the ``HealthKit-swift.class`` module to collect step count samples, and request read access to some additional sample types.

```swift
HealthKit {
    CollectSample(.stepCount)
    CollectSample(.heartRate, continueInBackground: true)
    RequestReadAccess(quantity: [.heartRate, .bloodOxygen])
}
```


## Health Data Access Authorization

iOS apps require user consent in order to access Health data stored on the device.
The `HealthKit` module manages this for Spezi applications: the module builds up the set of Health data access requirements of all configuration components, and keep track of the app's current Health data access requirements. 

Your app should, at some point during its launch call ``HealthKit-swift.class/askForAuthorization()``.
This will ask the user to grant the app access to all HealthKit data types requested by the configuration components.
You can choose the timing of this call in a way that best suits your app: for example, during your app's first launch you might want to integrate the Health permission request into a dedicated onboarding step.


## Topics

### HealthKit module
- ``HealthKit-class``
- ``HealthKitConstraint``

### Module Configuration

- ``HealthKitConfigurationComponent``
- ``HealthKit-swift.class/DataAccessRequirements``
- ``RequestReadAccess``
- ``RequestWriteAccess``


================================================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType+CategoryTypes.md
================================================
# SampleType+CategoryTypes

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Well-known category sample types


## Topics

### Activity
- ``SampleType/appleStandHour``
- ``SampleType/lowCardioFitnessEvent``

### Reproductive Health
- ``SampleType/menstrualFlow``
- ``SampleType/intermenstrualBleeding``
- ``SampleType/infrequentMenstrualCycles``
- ``SampleType/irregularMenstrualCycles``
- ``SampleType/persistentIntermenstrualBleeding``
- ``SampleType/prolongedMenstrualPeriods``
- ``SampleType/cervicalMucusQuality``
- ``SampleType/ovulationTestResult``
- ``SampleType/progesteroneTestResult``
- ``SampleType/sexualActivity``
- ``SampleType/contraceptive``
- ``SampleType/pregnancy``
- ``SampleType/pregnancyTestResult``
- ``SampleType/lactation``

### Hearing
- ``SampleType/environmentalAudioExposureEvent``
- ``SampleType/headphoneAudioExposureEvent``

### Vital Signs
- ``SampleType/lowHeartRateEvent``
- ``SampleType/highHeartRateEvent``
- ``SampleType/irregularHeartRhythmEvent``

### Mobility
- ``SampleType/appleWalkingSteadinessEvent``

### Mindfulness and Sleep
- ``SampleType/mindfulSession``
- ``SampleType/sleepAnalysis``

### Self Care
- ``SampleType/toothbrushingEvent``
- ``SampleType/handwashingEvent``


================================================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType+QuantityTypes.md
================================================
# SampleType+QuantityTypes

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Well-known quantity sample types


## Topics

### Activity
- ``SampleType/stepCount``
- ``SampleType/distanceWalkingRunning``
- ``SampleType/runningGroundContactTime``
- ``SampleType/runningPower``
- ``SampleType/runningSpeed``
- ``SampleType/runningStrideLength``
- ``SampleType/runningVerticalOscillation``
- ``SampleType/distanceCycling``
- ``SampleType/pushCount``
- ``SampleType/distanceWheelchair``
- ``SampleType/swimmingStrokeCount``
- ``SampleType/distanceSwimming``
- ``SampleType/distanceDownhillSnowSports``
- ``SampleType/basalEnergyBurned``
- ``SampleType/activeEnergyBurned``
- ``SampleType/flightsClimbed``
- ``SampleType/appleExerciseTime``
- ``SampleType/appleMoveTime``
- ``SampleType/appleStandTime``
- ``SampleType/vo2Max``

### Body Measurements
- ``SampleType/height``
- ``SampleType/bodyMass``
- ``SampleType/bodyMassIndex``
- ``SampleType/leanBodyMass``
- ``SampleType/bodyFatPercentage``
- ``SampleType/waistCircumference``
- ``SampleType/appleSleepingWristTemperature``

### Reproductive Health
- ``SampleType/basalBodyTemperature``

### Hearing
- ``SampleType/environmentalAudioExposure``
- ``SampleType/headphoneAudioExposure``

### Vital Signs
- ``SampleType/heartRate``
- ``SampleType/restingHeartRate``
- ``SampleType/walkingHeartRateAverage``
- ``SampleType/heartRateVariabilitySDNN``
- ``SampleType/heartRateRecoveryOneMinute``
- ``SampleType/atrialFibrillationBurden``
- ``SampleType/bloodOxygen``
- ``SampleType/bodyTemperature``
- ``SampleType/bloodPressureDiastolic``
- ``SampleType/bloodPressureSystolic``
- ``SampleType/respiratoryRate``

### Lab Results
- ``SampleType/bloodGlucose``
- ``SampleType/electrodermalActivity``
- ``SampleType/forcedExpiratoryVolume1``
- ``SampleType/forcedVitalCapacity``
- ``SampleType/inhalerUsage``
- ``SampleType/insulinDelivery``
- ``SampleType/numberOfTimesFallen``
- ``SampleType/peakExpiratoryFlowRate``
- ``SampleType/peripheralPerfusionIndex``

### Nutrition
- ``SampleType/dietaryBiotin``
- ``SampleType/dietaryCaffeine``
- ``SampleType/dietaryCalcium``
- ``SampleType/dietaryCarbohydrates``
- ``SampleType/dietaryChloride``
- ``SampleType/dietaryCholesterol``
- ``SampleType/dietaryChromium``
- ``SampleType/dietaryCopper``
- ``SampleType/dietaryEnergyConsumed``
- ``SampleType/dietaryFatMonounsaturated``
- ``SampleType/dietaryFatPolyunsaturated``
- ``SampleType/dietaryFatSaturated``
- ``SampleType/dietaryFatTotal``
- ``SampleType/dietaryFiber``
- ``SampleType/dietaryFolate``
- ``SampleType/dietaryIodine``
- ``SampleType/dietaryIron``
- ``SampleType/dietaryMagnesium``
- ``SampleType/dietaryManganese``
- ``SampleType/dietaryMolybdenum``
- ``SampleType/dietaryNiacin``
- ``SampleType/dietaryPantothenicAcid``
- ``SampleType/dietaryPhosphorus``
- ``SampleType/dietaryPotassium``
- ``SampleType/dietaryProtein``
- ``SampleType/dietaryRiboflavin``
- ``SampleType/dietarySelenium``
- ``SampleType/dietarySodium``
- ``SampleType/dietarySugar``
- ``SampleType/dietaryThiamin``
- ``SampleType/dietaryVitaminA``
- ``SampleType/dietaryVitaminB12``
- ``SampleType/dietaryVitaminB6``
- ``SampleType/dietaryVitaminC``
- ``SampleType/dietaryVitaminD``
- ``SampleType/dietaryVitaminE``
- ``SampleType/dietaryVitaminK``
- ``SampleType/dietaryWater``
- ``SampleType/dietaryZinc``

### Alcohol Consumption
- ``SampleType/bloodAlcoholContent``
- ``SampleType/numberOfAlcoholicBeverages``       

### Mobility
- ``SampleType/appleWalkingSteadiness``
- ``SampleType/sixMinuteWalkTestDistance``
- ``SampleType/walkingSpeed``
- ``SampleType/walkingStepLength``
- ``SampleType/walkingAsymmetryPercentage``
- ``SampleType/walkingDoubleSupportPercentage``
- ``SampleType/stairAscentSpeed``
- ``SampleType/stairDescentSpeed``

### UV Exposure
- ``SampleType/uvExposure``

### Diving
- ``SampleType/underwaterDepth``
- ``SampleType/waterTemperature``


================================================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType.md
================================================
# ``SampleType``

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Work with HealthKit data types.

## Overview

The `SampleType` struct enables easy access to the various types of data supported by HealthKit, in a type-safe manner.

`SampleType` is generic over the sample type's respective `HKSample` subclass.
For example, the sample type representing heart rate samples (``SampleType/heartRate``) will fetch quantity samples, and is therefore a `SampleType<HKQuantitySample>`. 

> Note: `SampleType` already defines extensions for many HealthKit data types. It is strongly recommended you use these, whenever possible.


## Topics

### Accessing information about a SampleType
- ``SampleType/hkSampleType``
- ``SampleType/displayTitle``
- ``SampleType/displayUnit-1rnhb``
- ``SampleType/expectedValuesRange``

### Well-known quantity types
- <doc:SampleType+QuantityTypes>

### Well-known correlation types
- ``SampleType/bloodPressure``
- ``SampleType/food``

### Well-known category types
- <doc:SampleType+CategoryTypes>

### Other sample types
- ``SampleType/audiogram``
- ``SampleType/electrocardiogram``

### Creating new SampleTypes
- ``SampleType/quantity(_:displayTitle:displayUnit:expectedValuesRange:)``
- ``SampleType/correlation(_:displayTitle:associatedQuantityTypes:)``
- ``SampleType/category(_:displayTitle:)``


### AnySampleType

The ``AnySampleType`` protocol allows ``SampleType``s to be used in a type-erased manner.



================================================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SpeziHealthKit.md
================================================
# ``SpeziHealthKit``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Access Health data in your Spezi app.

## Overview

The Spezi HealthKit module enables apps to integrate with Apple's HealthKit system, fetch data, set up long-lived background data collection, and visualize Health-related data.

### Setup

You need to add the Spezi HealthKit Swift package to
 [your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) or
 [Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the
 [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) and set up the core Spezi infrastructure. 

### Example

Before you configure the ``HealthKit-class`` module, make sure your `Standard` in your Spezi Application conforms to the ``HealthKitConstraint`` protocol to receive HealthKit data.
The ``HealthKitConstraint/add(sample:)`` function is called once for every newly collected HealthKit sample, and the ``HealthKitConstraint/remove(sample:)`` function is called once for every deleted HealthKit sample.
```swift
actor ExampleStandard: Standard, HealthKitConstraint {
    // Add the newly collected HKSample to your application.
    func add(sample: HKSample) async {
        // ...
    }

    // Remove the deleted HKSample from your application.
    func remove(sample: HKDeletedObject) {
        // ...
    }
}
```


Then, you can configure the ``HealthKit-class`` module in the configuration section of your `SpeziAppDelegate`.
You can, e.g., use ``CollectSample`` to collect a wide variety of HealthKit data types:
```swift
class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: ExampleStandard()) {
            HealthKit {
                CollectSample(.activeEnergyBurned)
                CollectSample(.stepCount, start: .manual)
                CollectSample(.pushCount, start: .manual)
                CollectSample(.heartRate, continueInBackground: true)
                CollectSample(.electrocardiogram, start: .manual)
                RequestReadAccess(quantity: [.bloodOxygen])
            }
        }
    }
}
```

> Tip: See ``SampleType`` for a complete list of supported sample types.

> Important: In order to be able to read Health data, your app's `Info.plist` file must include the `NSHealthShareUsageDescription` key.

## Topics

### Module
- <doc:ModuleConfiguration>

### Health Data Collection
- ``CollectSample``
- ``HealthDataCollector``
- ``HealthDataCollectorDeliverySetting``

### HealthKit Sample Types
- ``SampleType``
- ``AnySampleType``

### HealthKit Utilities
- ``HealthKit/HKUnit/*(_:_:)``
- ``HealthKit/HKUnit//(_:_:)``


================================================
File: Sources/SpeziHealthKitUI/SpeziHealthKitUI.docc/HealthChart.md
================================================
# ``HealthChart``

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Visualize queried Health data using a chart.

## Overview

Health samples obtained via a ``HealthKitQuery`` or statistics obtained via a ``HealthKitStatisticsQuery`` can be visualized using the `HealthChart`.

A ``HealthChart`` is populated via the ``HealthChartEntry`` type.
Each entry in a chart manages one data set which should be displayed.
Typically, you probably will want to display only a single [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) in a chart

### Example: Visualising Blood Oxygen Samples

Use the ``HealthKitQuery`` and ``HealthKitStatisticsQuery`` property wrappers to fetch Health data for a [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) within your view.
You then use the property wrapper's `projectedValue` to populate the chart with 

```swift
@HealthKitQuery(.bloodOxygen, timeRange: .week)
var bloodOxygenSamples

var body: some View {
    HealthChart {
        HealthChartEntry($bloodOxygenSamples, drawingConfig: .init(mode: .line, color: .blue))
    }
}
```

## Topics

### Creating a HealthChart
- ``HealthChart/init(timeInterval:_:)``

### Supporting Types
- ``HealthChartEntry``
- ``HealthChart/ContentBuilder``
- ``HealthChartDataPoint``
- ``HealthChart/TimeIntervalInput``
- ``StatisticsAggregationOption``
- ``HealthChartDrawingConfig``



================================================
File: Sources/SpeziHealthKitUI/SpeziHealthKitUI.docc/SpeziHealthKitUI.md
================================================
# ``SpeziHealthKitUI``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Visualize Health data in your app


## Overview

Use SpeziHealthKitUI's ``HealthChart`` to visualize health data queried via [`SpeziHealthKit`](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit/documentation/SpeziHealthKit)

## Topics

### Querying Health Data in SwiftUI
- ``HealthKitQuery``
- ``HealthKitStatisticsQuery``
- ``HealthKitQueryTimeRange``
- ``HealthKitQueryResults``
- ``HealthKitCharacteristicQuery``

### Visualizing Queried Health Data
- ``HealthChart``

### ``HealthChart``


