Directory structure:
└── stanfordspezi-spezionboarding/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    ├── Sources/
    │   └── SpeziOnboarding/
    │       └── SpeziOnboarding.docc/
    │           ├── DisplayingInformation.md
    │           ├── ObtainingUserConsent.md
    │           └── SpeziOnboarding.md
    └── Tests/
        └── SpeziOnboardingTests/
            └── Resources/
                ├── markdown_data_one_page.md
                └── markdown_data_two_pages.md

================================================
File: README.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

# Spezi Onboarding

[![Build and Test](https://github.com/StanfordSpezi/SpeziOnboarding/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziOnboarding/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziOnboarding/branch/main/graph/badge.svg?token=lsRIXi5IXY)](https://codecov.io/gh/StanfordSpezi/SpeziOnboarding)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7806970.svg)](https://doi.org/10.5281/zenodo.7806970)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziOnboarding%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziOnboarding%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding)

Provides UI components for onboarding and consent.


## Overview

The Spezi Onboarding module provides user interface components to onboard a user to an application, including the possibility of retrieving consent for study participation.

|![Screenshot displaying the onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/OnboardingView.png#gh-light-mode-only) ![Screenshot displaying the onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/OnboardingView~dark.png#gh-dark-mode-only)|![Screenshot displaying the sequential onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/SequentialOnboardingView.png#gh-light-mode-only) ![Screenshot displaying the sequential onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/SequentialOnboardingView~dark.png#gh-dark-mode-only)|![Screenshot displaying the consent view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/ConsentView.png#gh-light-mode-only) ![Screenshot displaying the consent view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/ConsentView~dark.png#gh-dark-mode-only)
|:--:|:--:|:--:|
|[`OnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingview)|[`SequentialOnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/sequentialonboardingview)|[`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview)|


## Setup

### Add Spezi Onboarding as a Dependency

You need to add the Spezi Onboarding Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).


## Examples

### Onboarding View

The [`OnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingview) allows you to separate information into areas on a screen, each with a title, description, and icon.

```swift
import SpeziOnboarding
import SwiftUI


struct OnboardingViewExample: View {
    var body: some View {
        OnboardingView(
            title: "Welcome",
            subtitle: "This is an example onboarding view",
            areas: [
                .init(
                    icon: Image(systemName: "tortoise.fill"), 
                    title: "Tortoise", 
                    description: "A Tortoise!"
                ),
                .init(
                    icon: {
                        Image(systemName: "lizard.fill")
                            .foregroundColor(.green)
                    },
                    title: "Lizard", 
                    description: "A Lizard!"
                ),
                .init(
                    icon: {
                        Circle().fill(.orange)
                    }, 
                    title: "Circle", 
                    description: "A Circle!"
                )
            ],
            actionText: "Learn More",
            action: {
                // Action to perform when the user taps the action button.
            }
        )
    }
}
```


### Sequential Onboarding View

The [`SequentialOnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/sequentialonboardingview) allows you to display information step-by-step with each additional area appearing when the user taps the `Continue` button.

```swift
import SpeziOnboarding
import SwiftUI


struct SequentialOnboardingViewExample: View {
    var body: some View {
        SequentialOnboardingView(
            title: "Things to know",
            subtitle: "And you should pay close attention ...",
            content: [
                .init(
                    title: "A thing to know", 
                    description: "This is a first thing that you should know; read carefully!"
                ),
                .init(
                    title: "Second thing to know", 
                    description: "This is a second thing that you should know; read carefully!"
                ),
                .init(
                    title: "Third thing to know", 
                    description: "This is a third thing that you should know; read carefully!"
                )
            ],
            actionText: "Continue"
        ) {
            // Action to perform when the user has viewed all the steps
        }
    }
}
```


### Onboarding Consent View

The [`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview) can be used to allow your users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. The signed consent form can then be exported and shared as a PDF file.

The following example demonstrates how the [`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview) shown above is constructed by providing markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), an action that should be performed once the consent has been given (which receives the exported consent form as a PDF), as well as a configuration defining the properties of the exported consent form.

```swift
import SpeziOnboarding
import SwiftUI


struct ConsentViewExample: View {
    var body: some View {
        OnboardingConsentView(
            markdown: {
                Data("This is a *markdown* **example**".utf8)
            },
            action: { exportedConsentPdf in
                // Action to perform once the user has given their consent.
                // Closure receives the exported consent PDF to persist or upload it.
            },
            exportConfiguration: .init(paperSize: .usLetter),    // Configure the properties of the exported consent form
            currentDateInSignature: true   // Indicates if the consent signature should include the current date.
        )
    }
}
```

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding/documentation).


## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the `SpeziOnboarding` module.


## Running Tests Locally
If you would like to clone this repo and run the unit and UI tests locally, please be aware that you need to have git lfs (large file storage) configured. The unit tests load some binary data (e.g., PDF files) at runtime, which are stored in the [test resources](Tests/SpeziOnboardingTests/Resources/) as git lfs tags. To install git lfs, please refer to the [official documentation](https://git-lfs.com/). Afterward set up git lfs for your user by executing the following command:
```sh
git lfs install
``` 
Now, you can clone the repo and the binary files should be checked out correctly.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziOnboarding/tree/main/LICENSES) for more information.

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

SpeziOnboarding contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Vishnu Ravi](https://github.com/vishnuravi)
* [Andreas Bauer](https://github.com/Supereg)
* [Philipp Zagar](https://github.com/philippzagar)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


================================================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/DisplayingInformation.md
================================================
# Displaying Information

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Display information to your user during an onboarding flow.

## OnboardingView

The <doc:OnboardingView> allows you to separate information into areas on a screen, each with a title, description, and icon.

@Image(source: "OnboardingView.png")

The following example demonstrates how the above view is constructed:

```swift
OnboardingView(
    title: "Welcome",
    subtitle: "Spezi UI Tests",
    areas: [
        .init(
            icon: Image(systemName: "tortoise.fill"), 
            title: "Tortoise", 
            description: "A Tortoise!"
        ),
        .init(
            icon: Image(systemName: "lizard.fill"), 
            title: "Lizard", 
            description: "A Lizard!"
        ),
        .init(
            icon: Image(systemName: "tree.fill"), 
            title: "Tree", 
            description: "A Tree!"
        )
    ],
    actionText: "Learn More",
    action: {
        // Action to perform when the user taps the action button.
    }
)
```

## SequentialOnboardingView

The <doc:SequentialOnboardingView> allows you to display information step-by-step, with each additional area appearing when the user taps the `Continue` button.

@Image(source: "SequentialOnboardingView.png")

The following example demonstrates how the above view is constructed:

```swift
SequentialOnboardingView(
    title: "Things to know",
    subtitle: "And you should pay close attention ...",
    content: [
        .init(
            title: "A thing to know", 
            description: "This is a first thing that you should know; read carefully!"
        ),
        .init(
            title: "Second thing to know", 
            description: "This is a second thing that you should know; read carefully!"
        ),
        .init(
            title: "Third thing to know", 
            description: "This is a third thing that you should know; read carefully!"
        )
    ],
    actionText: "Continue"
) {
    // Action to perform when the user has viewed all the steps
}
```

## Topics

### Views

- <doc:OnboardingView>
- <doc:SequentialOnboardingView>


================================================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/ObtainingUserConsent.md
================================================
# Obtaining User Consent

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Present your user a consent document to read and sign.

### Obtaining User Consent

The ``OnboardingConsentView`` can allow users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. 

@Image(source: "ConsentView.png")

The following example demonstrates how the ``OnboardingConsentView`` shown above is constructed by providing a header, markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), an action that should be performed once the consent has been given (which receives the exported consent form as a PDF), as well as a configuration defining the properties of the exported consent form.

```swift
OnboardingConsentView(
    markdown: {
        Data("This is a *markdown* **example**".utf8)
    },
    action: { exportedConsentPdf in
        // Action to perform once the user has given their consent.
        // Closure receives the exported consent PDF to persist or upload it.
    },
    title: "Consent",   // Configure the title of the consent view
    exportConfiguration: .init(paperSize: .usLetter),   // Configure the properties of the exported consent form.
    currentDateInSignature: true   // Indicates if the consent signature should include the current date.
)
```

### Using multiple consent forms

If you want to show multiple consent documents to the user, that need to be signed separately, you can add multiple instances of ``OnboardingConsentView``.
If used within the ``OnboardingStack``, it is important to specify a unique `View/onboardingIdentifier(:identifier)` for each ``OnboardingConsentView``.


```swift
OnboardingStack {
    OnboardingConsentView(
        markdown: { Data("This is a *markdown* **example**".utf8) },
        action: { firstConsentPdf in
            // Store or share the first signed consent form.
            // Use the `OnboardingNavigationPath` from the SwiftUI `@Environment` to navigate to the next `OnboardingConsentView`.
        }
    )
        .onboardingIdentifier("firstConsentView") // Set an identifier (String) for the `View`, to distinguish it from other `View`s of the same type.

    OnboardingConsentView(
        markdown: { Data("This is a *markdown* **example**".utf8) },
        action: { secondConsentPdf in
            // Store or share the second signed consent form.
        }
    )
        .onboardingIdentifier("secondConsentView"), // Set an identifier for the `View`, to distinguish it from other `View`s of the same type.
}
```

## Topics

### Views

- ``OnboardingConsentView``
- ``ConsentDocument``
- ``SignatureView``

### Export

- ``ConsentViewState``
- ``ConsentDocumentExportRepresentation``


================================================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/SpeziOnboarding.md
================================================
# ``SpeziOnboarding``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Provides SwiftUI views for onboarding users onto a digital health application.

## Overview

The `SpeziOnboarding` module provides views that can be used for performing onboarding tasks, such as providing an overview of your app and asking a user to read and sign a consent document.

@Row {
    @Column {
        @Image(source: "OnboardingView", alt: "Screenshot displaying the onboarding view.") {
            An ``OnboardingView`` allows you to separate information into areas on a screen, each with a title, description, and icon.
        }
    }
    @Column {
        @Image(source: "SequentialOnboardingView", alt: "Screenshot displaying the sequential onboarding view.") {
            A ``SequentialOnboardingView`` allows you to display information step-by-step with each additional area appearing when the user taps the "Continue" button.
        }
    }
    @Column {
        @Image(source: "ConsentView", alt: "Screenshot displaying the consent view.") {
            A ``OnboardingConsentView`` can be used to allow your users to read and agree to a document as well as exporting it.
        }
    }
}


## Setup

### Add Spezi Onboarding as a Dependency

You need to add the Spezi Onboarding Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).


## Examples

### Onboarding View

The ``OnboardingView`` allows you to separate information into areas on a screen, each with a title, description, and icon.

```swift
import SpeziOnboarding
import SwiftUI


struct OnboardingViewExample: View {
    var body: some View {
        OnboardingView(
            title: "Welcome",
            subtitle: "This is an example onboarding view",
            areas: [
                .init(
                    icon: Image(systemName: "tortoise.fill"), 
                    title: "Tortoise", 
                    description: "A Tortoise!"
                ),
                .init(
                    icon: {
                        Image(systemName: "lizard.fill")
                            .foregroundColor(.green)
                    },
                    title: "Lizard", 
                    description: "A Lizard!"
                ),
                .init(
                    icon: {
                        Circle().fill(.orange)
                    }, 
                    title: "Circle", 
                    description: "A Circle!"
                )
            ],
            actionText: "Learn More",
            action: {
                // Action to perform when the user taps the action button.
            }
        )
    }
}
```


### Sequential Onboarding View

The ``SequentialOnboardingView`` allows you to display information step-by-step, with each additional area appearing when the user taps the `Continue` button.

```swift
import SpeziOnboarding
import SwiftUI


struct SequentialOnboardingViewExample: View {
    var body: some View {
        SequentialOnboardingView(
            title: "Things to know",
            subtitle: "And you should pay close attention ...",
            content: [
                .init(
                    title: "A thing to know", 
                    description: "This is a first thing that you should know; read carefully!"
                ),
                .init(
                    title: "Second thing to know", 
                    description: "This is a second thing that you should know; read carefully!"
                ),
                .init(
                    title: "Third thing to know", 
                    description: "This is a third thing that you should know; read carefully!"
                )
            ],
            actionText: "Continue"
        ) {
            // Action to perform when the user has viewed all the steps
        }
    }
}
```


### Consent View

The ``OnboardingConsentView`` can allow users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. The signed consent form can then be exported as a PDF document and shared.

The following example demonstrates how the ``OnboardingConsentView`` shown above is constructed by providing a header, markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), and an action that should be performed once the consent has been given.

```swift
import SpeziOnboarding
import SwiftUI


struct ConsentViewExample: View {
    var body: some View {
        OnboardingConsentView(
            markdown: {
                Data("This is a *markdown* **example**".utf8)
            },
            action: {
                // Action to perform once the user has given their consent
            },
            exportConfiguration: .init(paperSize: .usLetter),   // Configure the properties of the exported consent form
            currentDateInSignature: true   // Indicates if the consent signature should include the current date.
        )
    }
}
```


## Topics

### Articles

- <doc:DisplayingInformation>
- <doc:ObtainingUserConsent>

### Structuring an Onboarding Flow

- ``OnboardingStack``
- ``OnboardingNavigationPath``
- ``OnboardingViewBuilder``

### Onboarding Views

- ``OnboardingActionsView``
- ``OnboardingInformationView``
- ``OnboardingTitleView``
- ``OnboardingConsentView``
- ``OnboardingView``
- ``SequentialOnboardingView``

### Consent Views

- ``ConsentDocument``
- ``ConsentViewState``
- ``SignatureView``


================================================
File: Tests/SpeziOnboardingTests/Resources/markdown_data_one_page.md
================================================
This is a one page pdf example. 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

================================================
File: Tests/SpeziOnboardingTests/Resources/markdown_data_two_pages.md
================================================
This is a two page pdf example. 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

